<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class VerbController extends Controller
{
    public function verbs()
    {
        return Inertia::render('games/verbs/index');
    }
}
