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
        Schema::create('invoice_items', function (Blueprint $table) {
        $table->id();

        $table->foreignId('invoice_id')
            ->constrained('invoices')
            ->restrictOnDelete();

        $table->foreignId('dispensing_id')
            ->nullable()
            ->unique()
            ->constrained('dispensings')
            ->restrictOnDelete();

        $table->string('description', 255);
        $table->decimal('quantity', 10, 2);
        $table->decimal('unit_price', 12, 2);
        $table->decimal('line_total', 12, 2);

        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};
