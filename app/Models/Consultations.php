<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consultations extends Model
{
     protected $fillable = [
        'blood_pressure_systolic',
        'blood_pressure_diastolic',
        'temperature_c',
        'heart_rate',
        'respiratory_rate',
        'oxygen_saturation',
        'weight_kg',
        'height_cm',
        'history_notes',
        'examination_notes',
        'diagnosis_notes',
        'treatment_plan',
        'follow_up_date',
    ];

    protected function casts(): array
    {
        return [
            'blood_pressure_systolic' => 'integer',
            'blood_pressure_diastolic' => 'integer',
            'temperature_c' => 'decimal:1',
            'heart_rate' => 'integer',
            'respiratory_rate' => 'integer',
            'oxygen_saturation' => 'decimal:2',
            'weight_kg' => 'decimal:2',
            'height_cm' => 'decimal:2',
            'follow_up_date' => 'date',
        ];
    }

    public function visit(): BelongsTo
    {
        return $this->belongsTo(Visit::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
