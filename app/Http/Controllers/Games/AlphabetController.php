<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AlphabetController extends Controller
{
    public function alphabet()
    {
        return Inertia::render('games/alphabet/index');
    }
}
