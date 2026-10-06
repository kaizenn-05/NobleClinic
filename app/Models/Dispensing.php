<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Dispensing extends Model
{
    // Stock transactions will use explicit assignments.
    protected $guarded = ['*'];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'dispensed_at' => 'datetime',
        ];
    }

    public function prescriptionItem(): BelongsTo
    {
        return $this->belongsTo(PrescriptionItem::class);
    }

    public function medicineBatch(): BelongsTo
    {
        return $this->belongsTo(MedicineBatch::class);
    }

    public function dispensedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dispensed_by');
    }

    public function stockMovement(): HasOne
    {
        return $this->hasOne(StockMovement::class);
    }

    public function invoiceItem(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(InvoiceItem::class);
    }
}
