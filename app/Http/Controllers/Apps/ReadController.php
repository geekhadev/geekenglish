<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\ApiRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReadController extends Controller
{
    public function index()
    {
        $api_requests = ApiRequest::where('service', 'read')
            ->where('request_date', now()->toDateString())
            ->where('user_id', Auth::user()->id)
            ->first();

        return Inertia::render('apps/read/index', [
            'api_requests' => $api_requests,
        ]);
    }
}
