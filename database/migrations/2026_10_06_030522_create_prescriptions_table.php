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
            Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('visit_id')
                ->constrained('visits')
                ->restrictOnDelete();

            $table->foreignId('prescribed_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->dateTime('prescribed_at');
            $table->text('notes')->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
