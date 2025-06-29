<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPointsHistory extends Model
{
    use HasFactory;

    protected $table = 'user_points_history';

    protected $fillable = [
        'user_id',
        'type',
        'activity',
        'level',
        'status',
        'value',
        'counted',
        'points',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
