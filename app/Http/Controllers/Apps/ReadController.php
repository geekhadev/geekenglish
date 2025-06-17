<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ReadController extends Controller
{
    public function index()
    {
        return Inertia::render('apps/read/index');
    }
}
