<?php

namespace Database\Seeders;

use App\Models\PointType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PointTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pointTypes = [
            [
                'type' => 'game',
                'activity' => 'number',
                'points_value' => 1
            ],
            [
                'type' => 'game',
                'activity' => 'alphabet',
                'points_value' => 1
            ],
            [
                'type' => 'game',
                'activity' => 'verb',
                'points_value' => 1
            ],
        ];

        foreach ($pointTypes as $pointType) {
            PointType::create($pointType);
        }
    }
}
