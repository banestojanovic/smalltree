<?php

namespace App\Data;

use App\Models\Product;
use App\ProductStatus;
use App\ProductStockStatus;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CartProductData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $slug,
        public readonly string $sku,
        public readonly ?float $price,
        public readonly ?int $stock,
        public readonly ProductStockStatus $stock_status,
        public readonly ?string $description,
        public readonly ?ProductStatus $status,
        public readonly ?Media $cover,
        public readonly int $quantity,
    ) {}

    public static function fromModel(Product $product): CartProductData
    {
        return new self(
            $product->id,
            $product->name,
            $product->slug,
            $product->sku,
            $product->price,
            $product->stock,
            $product->stock_status,
            $product->description,
            $product->status,
            $product->cover,
            $product->pivot?->quantity,
        );
    }
}
