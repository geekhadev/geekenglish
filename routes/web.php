<?php

use App\Http\Controllers\ChatGptController;
use App\Http\Controllers\Apps\DictationController;
use App\Http\Controllers\Apps\CopyController;
use App\Http\Controllers\Apps\ReadController;
use App\Http\Controllers\Apps\UserController;
use App\Http\Controllers\Apps\VideoController;
use App\Http\Controllers\Games\AlphabetController;
use App\Http\Controllers\Games\NumberController;
use App\Http\Controllers\Games\PrepositionController;
use App\Http\Controllers\Games\VerbController;
use App\Http\Controllers\PointsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('points-public', [PointsController::class, 'index'])->name('points.public');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('games')->group(function () {
        Route::get('/numbers', [NumberController::class, 'numbers'])->name('games.numbers');
        Route::get('/alphabet', [AlphabetController::class, 'alphabet'])->name('games.alphabet');
        Route::get('/verbs', [VerbController::class, 'verbs'])->name('games.verbs');
        Route::get('/prepositions', [PrepositionController::class, 'prepositions'])->name('games.prepositions');
    });

    Route::get('points', [PointsController::class, 'index'])->name('points.index');
    Route::post('points', [PointsController::class, 'store'])->name('points.store');

    Route::prefix('apps')->group(function () {
        Route::get('/dictation', [DictationController::class, 'index'])->name('apps.dictation');
        Route::get('/copy', [CopyController::class, 'index'])->name('apps.copy');
        Route::get('/users', [UserController::class, 'index'])->name('apps.users');
        Route::get('/read', [ReadController::class, 'index'])->name('apps.read');
        Route::get('/video', [VideoController::class, 'index'])->name('apps.video');
    });

    Route::post('/users/{user}/friend-request', [UserController::class, 'sendFriendRequest'])->name('users.friend-request');
    Route::post('/users/{requestFriend}/friend-request/accept', [UserController::class, 'acceptFriendRequest'])->name('users.friend-request.accept');
    Route::post('/users/{requestFriend}/friend-request/reject', [UserController::class, 'rejectFriendRequest'])->name('users.friend-request.reject');
    Route::post('/users/{requestFriend}/friend-request/remove', [UserController::class, 'removeFriendRequest'])->name('users.friend-request.remove');

    Route::get('/dictation', [ChatGptController::class, 'dictation']);
    Route::post('/dictation/check-answer', [ChatGptController::class, 'checkAnswerDictation'])->name('dictation.check-answer');
    Route::get('/read', [ChatGptController::class, 'read'])->name('read');
    Route::post('/read/check-answer', [ChatGptController::class, 'checkAnswerRead'])->name('read.check-answer');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
