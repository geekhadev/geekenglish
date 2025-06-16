<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Irwing Naranjo',
            'email' => 'khalisser@gmail.com',
            'password' => Hash::make('qwerty123'),
        ]);

        $this->call([
            PointTypeSeeder::class,
        ]);
    }
}
