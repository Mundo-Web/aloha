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
        Schema::create('sending_history', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
            $table->string('name');
            $table->string('type')->default('Email');
            $table->json('mapping');
            $table->integer('completed')->default(0);
            $table->integer('failed')->default(0);
            $table->integer('total')->default(0);
            $table->boolean('status')->nullable()->default(null);

            $table->foreignUuid('mailing_template_id')
                ->nullable()
                ->constrained('mailing_templates')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sending_history');
    }
};
