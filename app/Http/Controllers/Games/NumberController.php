<?php

namespace App\Http\Controllers\Games;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class NumberController extends Controller
{
    public function numbers()
    {
        return Inertia::render('games/numbers/index');
    }
}
