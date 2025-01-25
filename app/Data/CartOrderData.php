<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class CartOrderData extends Data
{
    #[Computed]
    public float $subtotal;

    #[Computed]
    public float $total;

    #[Computed]
    public float $discount;

    #[Computed]
    public float $shipping;

    public function __construct(
        public int $id,
        public string $session,
        #[DataCollectionOf(CartOrderProductData::class)]
        public ?Collection $products,
    ) {
        $this->total = $this->products->sum('total');
        $this->subtotal = $this->products->reduce(fn ($carry, $item) => $carry + (($item->pivot->real_price * $item->pivot->quantity)), 0);

        $this->shipping = 0;
        $this->discount = $this->products->reduce(fn ($carry, $item) => $carry + (($item->pivot->real_price * $item->pivot->quantity) - $item->total), 0);
    }
}
