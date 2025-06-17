<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DictationController extends Controller
{
    public function index()
    {
        return Inertia::render('apps/dictation/index');
    }
}
