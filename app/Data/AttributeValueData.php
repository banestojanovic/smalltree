<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class AttributeValueData extends Data
{
    public function __construct(
        public int $id,
        public int $attribute_id,
        public string $value,
        public AttributeData $attribute,
    ) {}
}
