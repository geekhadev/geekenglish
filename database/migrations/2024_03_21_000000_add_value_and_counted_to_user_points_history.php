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
        Schema::table('user_points_history', function (Blueprint $table) {
            $table->string('value')->nullable()->after('activity');
            $table->boolean('counted')->default(true)->after('value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_points_history', function (Blueprint $table) {
            $table->dropColumn(['value', 'counted']);
        });
    }
};
