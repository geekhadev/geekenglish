<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PointType extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'activity',
        'points_value'
    ];
}
