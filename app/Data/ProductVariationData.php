<?php

namespace App\Data;

use App\ProductStockStatus;
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
        public ?VariationValueData $variation,
    ) {}
}
