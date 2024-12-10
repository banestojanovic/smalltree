<?php

namespace App\Models;

use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductVariation extends Model
{
    /** @use HasFactory<\Database\Factories\ProductVariationFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'sku',
        'price',
        'stock',
        'stock_status',
        'is_default',
        'data',
    ];

    protected $casts = [
        'stock_status' => ProductStockStatus::class,
        'data' => 'array',
    ];

    protected function price(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => $value * 100,
        );
    }

    public function variation(): BelongsTo
    {
        return $this->belongsTo(VariationValue::class);
    }

    public function variations(): BelongsToMany
    {
        return $this->belongsToMany(VariationValue::class);
    }

    public function discount(): HasOne
    {
        return $this->hasOne(Discount::class);
    }
}
