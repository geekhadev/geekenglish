<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PrepositionController extends Controller
{
    public function prepositions()
    {
        return Inertia::render('games/prepositions/index');
    }
}
