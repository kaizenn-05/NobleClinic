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
        Schema::create('medicine_batches', function (Blueprint $table) {
        $table->id();

        $table->foreignId('medicine_id')
            ->constrained('medicines')
            ->restrictOnDelete();

        $table->string('batch_number', 100);
        $table->date('expiry_date');
        $table->unsignedInteger('quantity_on_hand')->default(0);
        $table->decimal('unit_cost', 12, 2);
        $table->dateTime('received_at');

        $table->foreignId('received_by')
            ->constrained('users')
            ->restrictOnDelete();

        $table->timestamps();

        $table->unique(['medicine_id', 'batch_number']);
        $table->index(['medicine_id', 'expiry_date']);
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicine_batches');
    }
};
