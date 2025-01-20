<?php

namespace App\Data;

use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class ProductVariationData extends Data
{
    public function __construct(
        public int $id,
        public int $product_id,
        public string $sku,
        public ?float $price,
        public ?int $stock,
        public ProductStockStatus $stock_status,
        public ?DiscountData $discount,
        public ?VariationValueData $variation,
        #[DataCollectionOf(VariationValueData::class)]
        public ?Collection $variations,
    ) {}
}
