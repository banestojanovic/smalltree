<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class GlobalData extends Data
{
    public function __construct(
        #[DataCollectionOf(CategoryData::class)]
        public ?Collection $categories,
    ) {}
}
