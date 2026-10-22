<?php

namespace App\Services;

use App\Models\Patient;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PatientRegistrationService
{
    public function register(array $data, int $registeredBy): Patient
    {
        return DB::transaction(function () use ($data, $registeredBy) {
            $sequence = DB::table('patient_number_sequences')
                ->where('id', 1)
                ->lockForUpdate()
                ->first();

            if (!$sequence) {
                throw new \RuntimeException(
                    'Patient number counter is missing.'
                );
            }

            $nextNumber = (int) $sequence->last_number + 1;

            if ($nextNumber > 99999999) {
                throw ValidationException::withMessages([
                    'patient_number' =>
                        'The patient number limit has been reached.',
                ]);
            }

            $digits = str_pad(
                (string) $nextNumber,
                8,
                '0',
                STR_PAD_LEFT
            );

            $patientNumber = implode('-', str_split($digits, 2));

            $patient = new Patient();

            $patient->fill(Arr::only($data, [
                'first_name',
                'middle_name',
                'last_name',
                'suffix',
                'birth_date',
                'sex',
                'phone',
                'address',
                'emergency_contact_name',
                'emergency_contact_phone',
            ]));

            // Assigned by the server, never from form input.
            $patient->patient_number = $patientNumber;
            $patient->registered_by = $registeredBy;
            $patient->save();

            DB::table('patient_number_sequences')
                ->where('id', 1)
                ->update(['last_number' => $nextNumber]);

            return $patient;
        }, 5);
    }
}
