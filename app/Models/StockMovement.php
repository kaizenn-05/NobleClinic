<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockMovement extends Model
{
    protected $guarded = ['*'];

    protected function casts(): array
    {
        return [
            'quantity_change' => 'integer',
            'occurred_at' => 'datetime',
        ];
    }

    public function medicineBatch(): BelongsTo
    {
        return $this->belongsTo(MedicineBatch::class);
    }

    public function dispensing(): BelongsTo
    {
        return $this->belongsTo(Dispensing::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
