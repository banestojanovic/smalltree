<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class CartOrderProductData extends Data
{
    #[Computed]
    public int $quantity;

    #[Computed]
    public float $total;

    #[Computed]
    public float $chosenId;

    #[Computed]
    public ?VariationValueData $variation;

    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $sku,
        #[DataCollectionOf(ProductVariationData::class)]
        public ?Collection $variations,
        public ?Pivot $pivot,
    ) {
        $this->chosenId = $this->pivot->product_variation_id ?? $this->id;

        $this->quantity = $this->pivot->quantity ?? 1;
        $this->total = $this->quantity * ($this->pivot->price);

        $this->variation = $this->variations->where('id', $this->chosenId)->first()?->variations[0] ?? null;
        $this->variations = null;
    }
}
