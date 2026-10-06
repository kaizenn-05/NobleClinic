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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
             $table->foreignId('patient_id')
            ->constrained('patients')
            ->restrictOnDelete();

            $table->foreignId('doctor_id')
            ->constrained('users')
            ->restrictOnDelete();

             $table->dateTime('scheduled_at');
            $table->text('reason')->nullable();
            $table->string('status', 20)->default('scheduled');

            $table->foreignId('created_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();
            $table->index(['doctor_id', 'scheduled_at']);
            $table->index(['patient_id', 'scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
