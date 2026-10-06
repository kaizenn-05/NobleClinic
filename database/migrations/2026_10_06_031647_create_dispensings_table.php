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
            Schema::create('dispensings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('prescription_item_id')
                ->constrained('prescription_items')
                ->restrictOnDelete();

            $table->foreignId('medicine_batch_id')
                ->constrained('medicine_batches')
                ->restrictOnDelete();

            $table->unsignedInteger('quantity');

            $table->foreignId('dispensed_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->dateTime('dispensed_at');
            $table->timestamps();

            $table->index('dispensed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dispensings');
    }
};
