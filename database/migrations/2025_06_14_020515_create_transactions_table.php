<?php

use App\Models\Sale;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->string('category');
            $table->longText('description');
            $table->date('date');
            $table->string('payment_method');
            $table->string('issue')->nullable();
            $table->decimal('amount', 10, 2);
            $table->longText('note')->nullable();
            $table->boolean('automatically_created')->default(false);

            $table->timestamps();
        });

        Sale::selectRaw('DATE(sales.created_at) as date, SUM(sales.total_amount) as daily_total')
            ->join('statuses', 'statuses.id', 'sales.status_id')
            ->where('statuses.is_ok', true)
            ->groupBy('date')
            ->get()
            ->each(function ($sale) {
                DB::table('transactions')->insert([
                    'category' => 'Ventas',
                    'description' => env('APP_NAME') . ' - ' . $sale->date,
                    'date' => $sale->date,
                    'payment_method' => 'Tarjeta',
                    'amount' => $sale->daily_total,
                    'automatically_created' => true,
                ]);
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
