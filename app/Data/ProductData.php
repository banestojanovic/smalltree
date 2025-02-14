<?php

namespace App\Data;

use App\ProductStatus;
use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
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
        public float|Optional $price,
        public float|Optional $base_price,
        public int|Optional $stock,
        public ProductStockStatus $stock_status,
        public string|Optional $description,
        public ProductStatus|Optional $status,
        public array|Optional $data,
        public Media|Optional $cover,
        public MediaCollection|Optional $photos,
        #[DataCollectionOf(ProductVariationData::class)]
        public Collection|Optional $variations,
        #[DataCollectionOf(AttributeValueData::class)]
        public Collection|Optional $attributes,
        #[DataCollectionOf(CategoryData::class)]
        public Collection|Optional $categories,
        public DiscountData|Optional $discount,
        #[DataCollectionOf(DiscountData::class)]
        public Collection|Optional $discounts,
        #[DataCollectionOf(TagData::class)]
        public Collection|Optional $productTags,
    ) {
        $this->grouped_variations = $variations->flatMap(fn ($variation) => $variation->variations)->groupBy('variation.name') ?? [];
        if ($this->attributes instanceof Collection) {
            $this->grouped_attributes = $this->attributes->groupBy('attribute.name');
        }

        $this->additional = [
            __('Sastojci') => $data['ingredients'] ?? '',
            __('Najbolje upotrebiti do') => $data['valid_until'] ?? '',
        ];

        if ($this->categories instanceof Collection) {
            $this->category = $this->categories->last();
        }
        if ($this->productTags instanceof Collection) {
            $this->tag = $this->productTags->first();
        }
    }
}
