<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PointType extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'activity',
        'points_value',
    ];
}
