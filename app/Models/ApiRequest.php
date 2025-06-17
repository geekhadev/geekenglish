<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ApiRequest extends Model
{
    protected $fillable = [
        'user_id',
        'service',
        'request_date',
        'request_count'
    ];

    protected $casts = [
        'request_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function canMakeRequest($userId, $service, $maxRequests = 2)
    {
        $today = now()->toDateString();

        $request = self::where('user_id', $userId)
            ->where('service', $service)
            ->where('request_date', $today)
            ->first();

        return !$request || $request->request_count < $maxRequests;
    }

    public static function recordRequest($userId, $service)
    {
        $today = now()->toDateString();

        return DB::transaction(function () use ($userId, $service, $today) {
            $request = self::where('user_id', $userId)
                ->where('service', $service)
                ->where('request_date', $today)
                ->first();

            if ($request) {
                $request->increment('request_count');
                return $request;
            }

            return self::create([
                'user_id' => $userId,
                'service' => $service,
                'request_date' => $today,
                'request_count' => 1
            ]);
        });
    }
}
