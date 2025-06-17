@extends('app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-center mb-8">Daily Dictation Exercise</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column: Audio and Text -->
            <div class="space-y-6">
                <!-- Audio Player -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-xl font-semibold mb-4">Listen to the Audio</h2>
                    <audio id="dictationAudio" controls class="w-full">
                        <source src="" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <div class="mt-4 flex justify-center space-x-4">
                        <button id="playButton" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Play
                        </button>
                        <button id="pauseButton" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Pause
                        </button>
                    </div>
                </div>

                <!-- Original Text (Hidden by default) -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold">Original Text</h2>
                        <button id="toggleText" class="text-blue-500 hover:text-blue-600">
                            Show Text
                        </button>
                    </div>
                    <div id="originalText" class="hidden text-gray-700 leading-relaxed">
                        <!-- Text will be loaded here -->
                    </div>
                </div>
            </div>

            <!-- Right Column: User Input -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-4">Write what you hear</h2>
                <textarea
                    id="userInput"
                    class="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Type what you hear here..."
                ></textarea>
                <div class="mt-4 flex justify-between">
                    <button id="checkButton" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
                        Check
                    </button>
                    <button id="clearButton" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                        Clear
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('dictationAudio');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const toggleTextButton = document.getElementById('toggleText');
    const originalText = document.getElementById('originalText');
    const userInput = document.getElementById('userInput');
    const checkButton = document.getElementById('checkButton');
    const clearButton = document.getElementById('clearButton');

    // Load today's dictation
    fetch('/api/dictation')
        .then(response => response.json())
        .then(data => {
            audio.src = data.audio;
            originalText.textContent = data.text;
        });

    // Audio controls
    playButton.addEventListener('click', () => audio.play());
    pauseButton.addEventListener('click', () => audio.pause());

    // Toggle original text
    toggleTextButton.addEventListener('click', () => {
        const isHidden = originalText.classList.contains('hidden');
        originalText.classList.toggle('hidden');
        toggleTextButton.textContent = isHidden ? 'Hide Text' : 'Show Text';
    });

    // Clear input
    clearButton.addEventListener('click', () => {
        userInput.value = '';
    });

    // Check answer
    checkButton.addEventListener('click', () => {
        const userText = userInput.value.trim().toLowerCase();
        const correctText = originalText.textContent.trim().toLowerCase();

        if (userText === correctText) {
            alert('Congratulations! Your answer is correct! 🎉');
        } else {
            alert('Not quite right. Keep trying! 💪');
        }
    });
});
</script>
@endpush
