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
        Schema::table('sales', function (Blueprint $table) {
            $table->foreignUuid('user_formula_id')->nullable()->change();
            $table->string('origin')->nullable()->default('Web');
            $table->longText('origin_comment')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->foreignUuid('user_formula_id')->nullable(false)->change();
            $table->dropColumn('origin');
            $table->dropColumn('origin_comment');
        });
    }
};
