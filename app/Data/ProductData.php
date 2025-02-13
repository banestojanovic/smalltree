<?php

namespace App\Data;

use App\ProductStatus;
use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductData extends Data
{
    #[Computed]
    public \Illuminate\Support\Collection|array|null $grouped_variations;

    #[Computed]
    public \Illuminate\Support\Collection|array|null $grouped_attributes;

    #[Computed]
    public ?array $additional;

    #[Computed]
    public ?CategoryData $category;

    #[Computed]
    public ?TagData $tag;

    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $sku,
        public ?float $price,
        public ?float $base_price,
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
        public ?DiscountData $discount,
        #[DataCollectionOf(DiscountData::class)]
        public ?Collection $discounts,
        #[DataCollectionOf(TagData::class)]
        public ?Collection $productTags,
    ) {
        $this->grouped_variations = $variations?->flatMap(fn ($variation) => $variation->variations)->groupBy('variation.name') ?? [];
        $this->grouped_attributes = $attributes?->groupBy('attribute.name') ?? [];

        $this->additional = [
            __('Sastojci') => $data['ingredients'] ?? '',
            __('Najbolje upotrebiti do') => $data['valid_until'] ?? '',
        ];

        $this->category = $categories?->last();
        $this->tag = $this->productTags?->first();
    }
}
