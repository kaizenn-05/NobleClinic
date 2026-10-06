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
    Schema::create('visits', function (Blueprint $table) {
        $table->id();

        $table->foreignId('patient_id')
            ->constrained('patients')
            ->restrictOnDelete();

        $table->foreignId('appointment_id')
            ->nullable()
            ->unique()
            ->constrained('appointments')
            ->restrictOnDelete();

        $table->foreignId('doctor_id')
            ->nullable()
            ->constrained('users')
            ->restrictOnDelete();

        $table->foreignId('checked_in_by')
            ->constrained('users')
            ->restrictOnDelete();

        $table->dateTime('checked_in_at');
        $table->text('chief_complaint')->nullable();
        $table->string('status', 20)->default('waiting');
        $table->dateTime('completed_at')->nullable();

        $table->timestamps();

        $table->index(['patient_id', 'checked_in_at']);
        $table->index(['status', 'checked_in_at']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
