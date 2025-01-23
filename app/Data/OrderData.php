<?php

namespace App\Data;

use App\OrderPaymentMethod;
use App\OrderStatus;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class OrderData extends Data
{
    #[Computed]
    public string $payment_method_label;

    #[Computed]
    public string $date_created;

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
        public ?CarbonImmutable $created_at,
        public OrderPaymentMethod $payment_method,
        public ?OrderStatus $status,
        public ?AddressData $shipping_address,
        public ?UserData $user,
        #[DataCollectionOf(OrderItemData::class)]
        public ?Collection $items,
        public ?PaymentData $payment,
    ) {
        $this->date_created = $created_at?->format('D, M d, Y');
        $this->payment_method_label = $payment_method->getLabel();
    }
}
