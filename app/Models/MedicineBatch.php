<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicineBatch extends Model
{
    protected $fillable = [
        'batch_number',
        'expiry_date',
        'unit_cost',
    ];

    protected function casts(): array
    {
        return [
            'expiry_date' => 'date',
            'quantity_on_hand' => 'integer',
            'unit_cost' => 'decimal:2',
            'received_at' => 'datetime',
        ];
    }

    public function medicine(): BelongsTo
    {
        return $this->belongsTo(Medicine::class);
    }

    public function receivedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    public function dispensings(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Dispensing::class);
    }

    public function stockMovements(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(StockMovement::class);
    }
}
