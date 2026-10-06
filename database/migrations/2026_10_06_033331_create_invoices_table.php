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
       Schema::create('invoices', function (Blueprint $table) {
        $table->id();
        $table->string('invoice_number', 30)->unique();

        $table->foreignId('visit_id')
            ->unique()
            ->constrained('visits')
            ->restrictOnDelete();

        $table->foreignId('issued_by')
            ->nullable()
            ->constrained('users')
            ->restrictOnDelete();

        $table->dateTime('issued_at')->nullable();
        $table->string('status', 20)->default('draft');

        $table->decimal('subtotal', 12, 2)->default(0);
        $table->decimal('discount_amount', 12, 2)->default(0);
        $table->decimal('total_amount', 12, 2)->default(0);

        $table->timestamps();

        $table->index(['status', 'issued_at']);
     });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
