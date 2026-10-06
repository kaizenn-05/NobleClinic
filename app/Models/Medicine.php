<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Medicine extends Model
{
     protected $fillable = [
        'medicine_code',
        'generic_name',
        'brand_name',
        'strength',
        'dosage_form',
        'stock_unit',
        'default_selling_price',
        'reorder_level',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'default_selling_price' => 'decimal:2',
            'reorder_level' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function batches(): HasMany
    {
        return $this->hasMany(MedicineBatch::class);
    }
}
