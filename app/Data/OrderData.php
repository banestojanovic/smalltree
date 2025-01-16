<?php

namespace App\Data;

use App\OrderStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class OrderData extends Data
{
    public function __construct(
        public int $id,
        public int $user_id,
        public int $shipping_address_id,
        public int $cart_id,
        public string $user_ip,
        public int $amount,
        public int $shipping,
        public int $discount,
        public int $total,
        public ?OrderStatus $status,
        public ?AddressData $shipping_address,
        public ?UserData $user,
        #[DataCollectionOf(OrderItemData::class)]
        public ?Collection $items,
    ) {}
}
