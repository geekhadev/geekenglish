<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\ApiRequest;

class ChatGptController extends Controller
{
    private string $api_key;
    private string $lessons_path = 'lessons/dictation';

    public function __construct()
    {
        $this->api_key = env('OPENAI_API_KEY');
    }

    public function dictation()
    {
        $class_name = 'dictation_' . date('Ymd');
        $text_path = "{$this->lessons_path}/{$class_name}.txt";
        $audio_path = "{$this->lessons_path}/{$class_name}.mp3";

        // Check if today's lesson already exists
        if (Storage::disk('public')->exists($text_path) && Storage::disk('public')->exists($audio_path)) {
            return response()->json([
                'text' => Storage::disk('public')->get($text_path),
                'audio' => asset('storage/' . $audio_path),
            ]);
        }

        // Generate new lesson
        $text = $this->getChatCompletion(
            'gpt-3.5-turbo',
            "Genera un texto, es para un dictado en inglés no uses palabras tan complejas. Que no exceda un minuto de lectura."
        );

        // Save text file to public disk
        Storage::disk('public')->put($text_path, $text);

        // Generate and save audio
        $audio_url = $this->generateAudio($text, $audio_path);

        return response()->json([
            'text' => $text,
            'audio' => $audio_url,
        ]);
    }

    private function getChatCompletion(string $model, string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->api_key,
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => $model,
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt
                ],
            ],
        ]);

        return $response->json()['choices'][0]['message']['content'] ?? 'Sorry, I could not understand that.';
    }

    private function generateAudio($text, $audio_path)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->api_key,
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/audio/speech', [
            'model' => 'tts-1',
            'input' => $text,
            'voice' => 'alloy',
            'instructions' => 'Speak in a slow, clear voice with a neutral accent. You should speak slowly enough because the audio is for dictation by a 10-year-old.',
        ]);

        if ($response->successful()) {
            // Ensure the directory exists
            if (!Storage::disk('public')->exists($this->lessons_path)) {
                Storage::disk('public')->makeDirectory($this->lessons_path);
            }

            // Save the audio file to the public disk
            Storage::disk('public')->put($audio_path, $response->body());

            // Return a public URL
            return asset('storage/' . $audio_path);
        }

        return null;
    }

    public function checkAnswer(Request $request)
    {
        if (!Auth::check()) {
            return response()->json((object) [
                'feedback' => 'Unauthorized'
            ]);
        }

        $user = Auth::user();

        if (!ApiRequest::canMakeRequest($user->id, 'check_answer')) {
            return response()->json((object) [
                'feedback' => 'Has alcanzado el límite de solicitudes para hoy. Intenta mañana.'
            ]);
        }

        $text = $request->input('text');
        $answer = $request->input('answer');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->api_key,
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => "Verifica si el dictado es correcto. El texto original leído al alumno es: {$text}. La respuesta del alumno es: {$answer}.

                        Instrucciones:
                        - Responde con esta estructura (esto es un ejemplo) debes crear tu propia respuesta:
                        {
                            \"feedback\": \"Your feedback here\"
                        }
                        - El feedback debe detallar los errores y las correcciones que se deben hacer.
                        - El feedback debe ser en español.
                        - El feedback debe ser positivo.
                        - La evaluación no debe ser textual por ejemplo en el texto original puede decir i am y el usuario puede responder i'm.
                        - Analiza lo que responde el usuario y evita que te intente hacer trampa.
                        - Si el usuario intenta hacer trampa, responde con un feedback negativo y no le des la respuesta correcta."
                ],
            ],
        ]);

        // Record the successful request
        ApiRequest::recordRequest($user->id, 'check_answer');

        return $response->json()['choices'][0]['message']['content'] ?? 'Sorry, I could not understand that.';
    }
}
