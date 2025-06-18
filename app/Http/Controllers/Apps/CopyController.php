<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CopyController extends Controller
{
    public function index()
    {
        return Inertia::render('apps/copy/index');
    }
}
