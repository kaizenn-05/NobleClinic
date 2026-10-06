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
    Schema::create('patients', function (Blueprint $table) {
        $table->id();

        $table->char('patient_number', 11)->unique();

        // Optional patient portal account
        $table->foreignId('user_id')
             ->nullable()
             ->unique()
             ->constrained('users')
             ->restrictOnDelete();

        $table->string('first_name', 100);
        $table->string('middle_name', 100)->nullable();
        $table->string('last_name', 100);
        $table->string('suffix', 10)->nullable();

        $table->date('birth_date');
        $table->string('sex', 20);
        $table->string('phone', 30)->nullable();
        $table->text('address')->nullable();

        $table->string('emergency_contact_name', 150)->nullable();
        $table->string('emergency_contact_phone', 30)->nullable();

        $table->foreignId('registered_by')
            ->constrained('users')
            ->restrictOnDelete();

        $table->timestamps();

        $table->index(['last_name', 'first_name', 'birth_date']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
