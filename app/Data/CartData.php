<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class CartData extends Data
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
        #[DataCollectionOf(CartProductData::class)]
        public ?Collection $products,
    ) {
        $this->total = $this->products->sum('realPrice');
        $this->subtotal = $this->products->sum('pivot.real_price');

        $this->shipping = 0;
        $this->discount = $this->products->reduce(fn ($carry, $item) => $carry + ($item->price - $item->realPrice), 0);
    }
}
