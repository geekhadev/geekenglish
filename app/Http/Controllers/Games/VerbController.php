<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerbController extends Controller
{
    public function verbs()
    {
        return Inertia::render('games/verbs/index');
    }
}
