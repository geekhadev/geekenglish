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
            "Genera un texto para un dictado, en inglés, no uses palabras complejas, debe tener entre 55 y 60 palabras, debe ser una situación cotidiana."
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

    public function checkAnswerDictation(Request $request)
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

    public function read()
    {
        $prefix_path = date('Ymd');
        $class_name = 'dictation';
        $text_path = "lessons/{$prefix_path}/{$class_name}.txt";

        if (Storage::disk('public')->exists($text_path)) {
            return response()->json([
                'text' => Storage::disk('public')->get($text_path),
            ]);
        }

        $text = $this->getChatCompletion(
            'gpt-3.5-turbo',
            "Genera un texto para hacer una copia, en inglés, no uses palabras complejas, debe tener entre 100 y 120 palabras, debe ser una situación cotidiana."
        );

        Storage::disk('public')->put($text_path, $text);

        return response()->json([
            'text' => $text,
        ]);
    }

    public function checkAnswerRead(Request $request)
    {
        if (!Auth::check()) {
            return response()->json((object) [
                'feedback' => 'Unauthorized'
            ]);
        }

        $user = Auth::user();

        if (!ApiRequest::canMakeRequest($user->id, 'read')) {
            return response()->json((object) [
                'feedback' => 'Has alcanzado el límite de solicitudes para hoy. Intenta mañana.'
            ]);
        }

        if (!$request->hasFile('file')) {
            return response()->json((object) [
                'feedback' => 'No se proporcionó ningún archivo de audio.'
            ]);
        }

        $audio = $request->file('file');
        $originalText = $request->input('text');
        $prefix_path = date('Ymd');
        $user_path = "users/{$user->id}/{$prefix_path}/lessons/read";

        if (!Storage::disk('public')->exists($user_path)) {
            Storage::disk('public')->makeDirectory($user_path, true);
        }

        $audio_path = "{$user_path}/audio.mp3";
        Storage::disk('public')->put($audio_path, file_get_contents($audio->getRealPath()));

        $transcriptionResponse = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
        ])->attach(
            'file',
            file_get_contents($audio->getRealPath()),
            $audio->getClientOriginalName()
        )->post('https://api.openai.com/v1/audio/transcriptions', [
            'model' => 'whisper-1',
            'language' => 'en',
        ]);

        if (!$transcriptionResponse->successful()) {
            return response()->json((object) [
                'feedback' => 'Error al transcribir el audio. Por favor, intenta de nuevo.'
            ]);
        }

        $transcribedText = $transcriptionResponse->json()['text'];

        $transcription_path = "{$user_path}/transcription.txt";
        Storage::disk('public')->put($transcription_path, $transcribedText);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => "Verifica si la lectura es correcta. El texto original es: {$originalText}. El texto transcrito de la lectura del alumno es: {$transcribedText}.

                        Instrucciones:
                        - Responde con esta estructura (esto es un ejemplo) debes crear tu propia respuesta:
                        {
                            \"feedback\": \"Your feedback here\"
                        }
                        - Corrije principalmente la pronunciación.
                        - El feedback debe detallar los errores y las correcciones que se deben hacer.
                        - El feedback debe ser en español pero solo de las pronunciaciones por lo que las referencias a las palabras deben ser en inglés.
                        - El feedback debe ser positivo.
                        - Analiza lo que responde el usuario y evita que te intente hacer trampa.
                        - Si el usuario intenta hacer trampa, responde con un feedback negativo y no le des la respuesta correcta.
                        - La respuesta debe ser un json válido, no puede trae caracteres como ```json porque se va a usar en un javascript.
                        - El texto proporcionado para evaluarlo es una lectura, por lo que tu feedback debe hacer referencia a que lo escuchaste no que lo leiste.
                        - Estas respondiendo cosas como escuchar tu transcripción del texto, se lógico, no se puede escuchar una transcripción se escucha una lectura.
                        - No menciones nada transcripción cuando hagas referencia al texto original es la lectura.
                        - No digas dijiste esto o dijiste eso, mejor dí entendí esto."
                ],
            ],
        ]);

        ApiRequest::recordRequest($user->id, 'read');

        return $response->json()['choices'][0]['message']['content'] ?? 'Sorry, I could not understand that.';
    }
}
