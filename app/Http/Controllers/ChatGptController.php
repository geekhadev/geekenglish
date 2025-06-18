<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\ApiRequest;

class ChatGptController extends Controller
{
    public function dictation()
    {
        $prefix_path = date('Ymd');
        $class_name = 'dictation';
        $text_path = "lessons/{$prefix_path}/{$class_name}.txt";
        $audio_path = "lessons/{$prefix_path}/{$class_name}.mp3";

        if (Storage::disk('public')->exists($text_path) && Storage::disk('public')->exists($audio_path)) {
            return response()->json([
                'text' => Storage::disk('public')->get($text_path),
                'audio' => asset('storage/' . $audio_path),
            ]);
        }

        $text = $this->getChatCompletion(
            'gpt-3.5-turbo',
            "Genera un texto para un dictado, en inglés, no uses palabras complejas, debe tener entre 55 y 60 palabras, debe ser una cituación cotidiana."
        );

        Storage::disk('public')->put($text_path, $text);

        $audio_url = $this->generateAudio($text, $audio_path);

        return response()->json([
            'text' => $text,
            'audio' => $audio_url,
        ]);
    }

    private function getChatCompletion(string $model, string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
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
        $voices = ['alloy', 'coral', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/audio/speech', [
            'model' => 'tts-1',
            'input' => $text,
            'voice' => $voices[array_rand($voices)],
            'instructions' => 'Speak in a slow, clear voice with a neutral accent. You should speak slowly enough because the audio is for dictation by a 10-year-old.',
        ]);

        if ($response->successful()) {
            $prefix_path = date('Ymd');
            $class_name = 'dictation';
            $audio_path = "lessons/{$prefix_path}/{$class_name}.mp3";

            if (!Storage::disk('public')->exists('lessons')) {
                Storage::disk('public')->makeDirectory('lessons');
                Storage::disk('public')->makeDirectory('lessons/' . $prefix_path);
            }

            Storage::disk('public')->put($audio_path, $response->body());

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

        if (!ApiRequest::canMakeRequest($user->id, 'dictation')) {
            return response()->json((object) [
                'feedback' => 'Has alcanzado el límite de solicitudes para hoy. Intenta mañana.'
            ]);
        }

        $text = $request->input('text');
        $answer = $request->input('answer');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
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
                        - Si el usuario intenta hacer trampa, responde con un feedback negativo y no le des la respuesta correcta.
                        - La respuesta debe ser un json válido, no puede trae caracteres como ```json porque se va a usar en un javascript."
                ],
            ],
        ]);

        ApiRequest::recordRequest($user->id, 'dictation');

        return $response->json()['choices'][0]['message']['content'] ?? 'Sorry, I could not understand that.';
    }
}
