<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patient_number_sequences', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->unsignedTinyInteger('id')->primary();
            $table->unsignedBigInteger('last_number')->default(0);
        });

        // Continue after existing patient numbers, if any.
        $lastNumber = 0;

        foreach (
            DB::table('patients')->select('patient_number')->cursor()
            as $patient
        ) {
            if (preg_match('/^\d{2}-\d{2}-\d{2}-\d{2}$/', $patient->patient_number)) {
                $number = (int) str_replace('-', '', $patient->patient_number);
                $lastNumber = max($lastNumber, $number);
            }
        }

        DB::table('patient_number_sequences')->insert([
            'id' => 1,
            'last_number' => $lastNumber,
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_number_sequences');
    }
};
