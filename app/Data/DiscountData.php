<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class DiscountData extends Data
{
    public function __construct(
        public int $id,
        public ?int $product_id,
        public ?int $product_variation_id,
        public ?float $price,
        public ?float $percentage,
        public ?string $starts_at,
        public ?string $ends_at,
    ) {}
}
