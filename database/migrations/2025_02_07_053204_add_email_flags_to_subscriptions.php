<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->boolean('is_user')->default(false);
            $table->boolean('created_formula')->default(false);
            $table->boolean('made_order')->default(false);
        });

        DB::table('subscriptions')
            ->leftJoin('users', 'subscriptions.description', '=', 'users.email')
            ->leftJoin('user_formulas', 'subscriptions.description', '=', 'user_formulas.email')
            ->leftJoin('sales', 'subscriptions.description', '=', 'sales.email')
            ->update([
                'is_user' => DB::raw('CASE WHEN users.id IS NOT NULL THEN true ELSE false END'),
                'created_formula' => DB::raw('CASE WHEN user_formulas.id IS NOT NULL THEN true ELSE false END'),
                'made_order' => DB::raw('CASE WHEN sales.id IS NOT NULL THEN true ELSE false END'),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn([
                'is_user',
                'created_formula',
                'made_order'
            ]);
        });
    }
};
