<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class VariationValueData extends Data
{
    public function __construct(
        public int $id,
        public int $variation_id,
        public string $value,
        public VariationData $variation,
    ) {}
}
