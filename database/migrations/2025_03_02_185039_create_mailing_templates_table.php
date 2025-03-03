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
        Schema::create('mailing_templates', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('model')->nullable();
            $table->string('type')->default('Email');
            $table->longText('content')->nullable();
            $table->json('vars')->nullable();
            $table->json('filters')->nullable();
            $table->boolean('auto_send')->nullable()->default(false);
            $table->boolean('status')->nullable()->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mailing_templates');
    }
};
