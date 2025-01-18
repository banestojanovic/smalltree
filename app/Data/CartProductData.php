<?php

namespace App\Data;

use App\ProductStatus;
use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CartProductData extends Data
{
    #[Computed]
    public int $quantity;

    #[Computed]
    public float $realPrice;

    #[Computed]
    public float $chosenId;

    #[Computed]
    public ?VariationValueData $variation;

    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $slug,
        public readonly string $sku,
        public readonly ?float $price,
        public readonly ?float $real_price,
        public readonly ?int $stock,
        public readonly ProductStockStatus $stock_status,
        public readonly ?string $description,
        public readonly ?ProductStatus $status,
        public readonly ?Media $cover,
        #[DataCollectionOf(ProductVariationData::class)]
        public ?Collection $variations,
        public ?Pivot $pivot,
    ) {
        $this->quantity = $this->pivot->quantity ?? 1;
        $this->realPrice = $this->quantity * ($this->pivot->price);
        $this->chosenId = $this->pivot->product_variation_id ?? $this->id;

        $this->variation = $this->variations->where('id', $this->pivot->product_variation_id)->first()?->variations[0] ?? null;
    }
}
