<?php

namespace App\Data;

use App\ProductStatus;
use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $sku,
        public ?float $price,
        public ?int $stock,
        public ProductStockStatus $stock_status,
        public ?string $description,
        public ?ProductStatus $status,
        public ?array $data,
        public ?Media $cover,
        public ?MediaCollection $photos,
        #[DataCollectionOf(ProductVariationData::class)]
        public ?Collection $variations,
        #[DataCollectionOf(AttributeValueData::class)]
        public ?Collection $attributes,
        #[DataCollectionOf(CategoryData::class)]
        public ?Collection $categories,
    ) {}
}
