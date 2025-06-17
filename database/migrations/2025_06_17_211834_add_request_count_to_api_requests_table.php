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
        Schema::table('api_requests', function (Blueprint $table) {
            $table->integer('request_count')->default(1)->after('request_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('api_requests', function (Blueprint $table) {
            $table->dropColumn('request_count');
        });
    }
};
