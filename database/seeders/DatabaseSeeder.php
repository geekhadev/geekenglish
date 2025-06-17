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
        User::create([
            'name' => 'Irwing Naranjo',
            'email' => 'khalisser@gmail.com',
            'password' => Hash::make('qwerty123'),
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Rodolfo Medina',
            'email' => 'rodolfo@gmail.com',
            'password' => Hash::make('qwerty123'),
            'email_verified_at' => now(),
        ]);

        // User::factory()->count(10)->create();

        $this->call([
            PointTypeSeeder::class,
        ]);
    }
}
