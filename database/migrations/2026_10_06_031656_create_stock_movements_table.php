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
            Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();

            $table->foreignId('medicine_batch_id')
                ->constrained('medicine_batches')
                ->restrictOnDelete();

            $table->foreignId('dispensing_id')
                ->nullable()
                ->unique()
                ->constrained('dispensings')
                ->restrictOnDelete();

            $table->string('movement_type', 30);

            // Positive = stock in; negative = stock out
            $table->integer('quantity_change');

            $table->text('reason')->nullable();

            $table->foreignId('recorded_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->dateTime('occurred_at');
            $table->timestamps();

            $table->index(['medicine_batch_id', 'occurred_at']);
            $table->index(['movement_type', 'occurred_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
