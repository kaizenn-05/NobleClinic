<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrescriptionItem extends Model
{
    protected $fillable = [
        'dose',
        'frequency',
        'duration',
        'quantity_prescribed',
        'instructions',
    ];

    protected function casts(): array
    {
        return [
            'quantity_prescribed' => 'integer',
        ];
    }

    public function prescription(): BelongsTo
    {
        return $this->belongsTo(Prescription::class);
    }

    public function medicine(): BelongsTo
    {
        return $this->belongsTo(Medicine::class);
    }

    public function dispensings(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Dispensing::class);
    }
}
