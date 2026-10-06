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
         Schema::create('prescription_items', function (Blueprint $table) {
        $table->id();

            $table->foreignId('prescription_id')
                ->constrained('prescriptions')
                ->restrictOnDelete();

            $table->foreignId('medicine_id')
                ->constrained('medicines')
                ->restrictOnDelete();

            $table->string('medicine_name_snapshot', 255);
            $table->string('dose', 100);
            $table->string('frequency', 100);
            $table->string('duration', 100)->nullable();
            $table->unsignedInteger('quantity_prescribed');
            $table->text('instructions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_items');
    }
};
