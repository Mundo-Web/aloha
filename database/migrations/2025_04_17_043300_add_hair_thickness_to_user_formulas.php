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
        Schema::table('user_formulas', function (Blueprint $table) {
            $table->foreignUuid('hair_thickness')
                ->nullable()
                ->after('hair_type')
                ->constrained('formulas')
                ->nullOnDelete();
        });
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_formulas', function (Blueprint $table) {
            $table->dropForeign(['hair_thickness']);
            $table->dropColumn('hair_thickness');
        });
    }
};
