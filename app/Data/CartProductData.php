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

    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $slug,
        public readonly string $sku,
        public readonly ?float $price,
        public readonly ?int $stock,
        public readonly ProductStockStatus $stock_status,
        public readonly ?string $description,
        public readonly ?ProductStatus $status,
        public readonly ?Media $cover,
        #[DataCollectionOf(ProductVariationData::class)]
        public ?Collection $variations,
        public ?Pivot $pivot,
    ) {
        $variation = $this->variations->where('id', $this->pivot->product_variation_id)->first();
        $this->quantity = $this->pivot->quantity ?? 1;
        $this->realPrice = $this->quantity * ($variation?->discount?->price ?? $variation->price ?? $this->price);
        $this->chosenId = $this->pivot->product_variation_id ?? $this->id;
    }
}
