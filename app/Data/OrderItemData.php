<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class OrderItemData extends Data
{
    public function __construct(
        public int $id,
        public int $order_id,
        public int $product_id,
        public ?int $product_variation_id,
        public int $quantity,
        public int $price,
        public int $discount,
        public int $tax,
        public ?ProductData $product,
    ) {}
}
