<?php

namespace App\Data;

use App\OrderStatus;
use App\ProductStatus;
use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class OrderData extends Data
{
    public function __construct(
        public int          $id,
        public int          $user_id,
        public int          $shipping_address_id,
        public int          $cart_id,
        public string       $user_ip,
        public int          $amount,
        public int          $shipping,
        public int          $discount,
        public int          $total,
        public ?OrderStatus $status,
        public ?AddressData $shipping_address,
        public ?UserData    $user,
        #[DataCollectionOf(OrderItemData::class)]
        public ?Collection  $items,
    )
    {
    }
}
