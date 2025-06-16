<?php

use App\Http\Controllers\Games\NumberController;
use App\Http\Controllers\Games\AlphabetController;
use App\Http\Controllers\PointsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('games')->group(function () {
        Route::get('/numbers', [NumberController::class, 'numbers'])->name('games.numbers');
        Route::get('/alphabet', [AlphabetController::class, 'alphabet'])->name('games.alphabet');
    });

    Route::get('points', [PointsController::class, 'index'])->name('points.index');
    Route::post('points', [PointsController::class, 'store'])->name('points.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
