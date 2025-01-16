<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Discount extends Model
{
    /** @use HasFactory<\Database\Factories\DiscountFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'product_variation_id',
        'price',
        'percentage',
        'starts_at',
        'ends_at',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    protected function price(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => $value * 100,
        );
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productVariation(): BelongsTo
    {
        return $this->belongsTo(ProductVariation::class);
    }

    protected static function booted(): void
    {
        static::created(function (Discount $discount) {
            if ($discount->price < 1) {
                return;
            }

            $product = Product::with('variations')->find($discount->product_id);

            if ($product === null) {
                return;
            }

            if ($product->product_type_id !== 1) {
                return null;
            }

            $discount->withoutEvents(function () use ($product, $discount) {
                $product->variations()->each(function (ProductVariation $productVariation) use ($product, $discount) {

                    $variationValue = $productVariation->variations->first()->getTranslation('value', 'sr');

                    if (! $productVariation->id) {
                        return;
                    }

                    if ($variationValue === '50g') {
                        Discount::create([
                            'product_id' => $product->id,
                            'product_variation_id' => $productVariation->id,
                            'price' => $discount->price * 0.5,
                            'percentage' => $discount->percentage,
                            'starts_at' => $discount->starts_at,
                            'ends_at' => $discount->ends_at,
                        ]);
                    }
                    if ($variationValue === '100g') {
                        Discount::create([
                            'product_id' => $product->id,
                            'product_variation_id' => $productVariation->id,
                            'price' => $discount->price,
                            'percentage' => $discount->percentage,
                            'starts_at' => $discount->starts_at,
                            'ends_at' => $discount->ends_at,
                        ]);
                    }
                    if ($variationValue === '250g') {
                        Discount::create([
                            'product_id' => $product->id,
                            'product_variation_id' => $productVariation->id,
                            'price' => $discount->price * 2.5,
                            'percentage' => $discount->percentage,
                            'starts_at' => $discount->starts_at,
                            'ends_at' => $discount->ends_at,
                        ]);
                    }
                });
            });
        });
    }
}
