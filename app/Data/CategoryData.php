<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CategoryData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public ?string $description,
        public ?Media $cover,
        public ?MediaCollection $images,
        #[DataCollectionOf(CategoryData::class)]
        public ?Collection $descendants = null,
    ) {}
}
