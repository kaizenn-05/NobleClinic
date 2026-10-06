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
        Schema::create('medicines', function (Blueprint $table) {
        $table->id();
        $table->string('medicine_code', 30)->unique();
        $table->string('generic_name', 150);
        $table->string('brand_name', 150)->nullable();
        $table->string('strength', 50);
        $table->string('dosage_form', 50);
        $table->string('stock_unit', 30);
        $table->decimal('default_selling_price', 12, 2);
        $table->unsignedInteger('reorder_level')->default(0);
        $table->boolean('is_active')->default(true);
        $table->timestamps();

        $table->index('generic_name');
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};
