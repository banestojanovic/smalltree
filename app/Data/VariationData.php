<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class VariationData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description,
        #[DataCollectionOf(VariationValueData::class)]
        public ?Collection $values,
    ) {}
}
