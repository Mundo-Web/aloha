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
            $table->enum('name', [
                'has_treatment',
                'scalp_type',
                'hair_type',
                'hair_thickness',
                'hair_goals'
            ])->change();
            $table->integer('presentation_order')->default(0)->after('correlative');
        });

        $formulas = [
            [
                'id' => '6ec65b24-4a10-4e4a-b3dc-56d23764a0d2',
                'name' => 'hair_type',
                'description' => 'Rizado',
                'correlative' => 'curly',
            ],
            [
                'id' => 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                'name' => 'hair_thickness',
                'description' => 'Delgado',
                'correlative' => 'fine',
                'presentation_order' => 1
            ],
            [
                'id' => '7c9e6679-7425-40de-944b-e07fc1f90ae7',
                'name' => 'hair_thickness',
                'description' => 'Medio',
                'correlative' => 'medium',
                'presentation_order' => 2
            ],
            [
                'id' => 'e4eaaaf2-d142-11e1-b3e4-080027620cdd',
                'name' => 'hair_thickness',
                'description' => 'Grueso',
                'correlative' => 'thick',
                'presentation_order' => 3
            ]
        ];

        foreach ($formulas as $formula) {
            Formula::create($formula);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Formula::whereIn('id', [
            '6ec65b24-4a10-4e4a-b3dc-56d23764a0d2',
            'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            '7c9e6679-7425-40de-944b-e07fc1f90ae7',
            'e4eaaaf2-d142-11e1-b3e4-080027620cdd',
        ])->delete();
        Schema::table('formulas', function (Blueprint $table) {
            $table->dropColumn('presentation_order');
            $table->enum('name', [
                'has_treatment',
                'scalp_type',
                'hair_type',
                'hair_goals'
            ])->change();
        });
    }
};
