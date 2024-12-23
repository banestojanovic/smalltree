<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class AttributeData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public ?string $description,
        #[DataCollectionOf(AttributeValueData::class)]
        public ?Collection $values,
    ) {
    }
}
