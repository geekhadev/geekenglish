<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\ApiRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DictationController extends Controller
{
    public function index()
    {
        $api_requests = ApiRequest::where('service', 'dictation')
            ->where('request_date', now()->toDateString())
            ->where('user_id', Auth::user()->id)
            ->first();

        return Inertia::render('apps/dictation/index', [
            'api_requests' => $api_requests,
        ]);
    }
}
