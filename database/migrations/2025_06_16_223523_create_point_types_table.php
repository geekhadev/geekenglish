<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('point_types', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // game, quiz, etc
            $table->string('activity'); // number, alphabet, etc
            $table->integer('points_value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_types');
    }
};
