<?php

use App\Models\Formula;
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
        Schema::table('formulas', function (Blueprint $table) {
            $table->integer('presentation_order')->default(0)->after('correlative');
            Formula::create([
                'id' => '6ec65b24-4a10-4e4a-b3dc-56d23764a0d2',
                'name' => 'hair_type',
                'description' => 'Rizado',
                'correlative' => 'curly',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('formulas', function (Blueprint $table) {
            $table->dropColumn('presentation_order');
            Formula::where('id', '6ec65b24-4a10-4e4a-b3dc-56d23764a0d2')->delete();
        });
    }
};
