<?php

namespace App\Actions;

use App\Events\OrderCreated;
use App\Models\Order;
use App\Models\User;
use App\OrderPaymentMethod;
use App\OrderStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CreateOrder
{
    /**
     * @throws ValidationException
     */
    public function execute(User $user): Order
    {
        $cart = (new \App\Support\Cart)->getCart();

        if (! $cart) {
            throw ValidationException::withMessages(['cart' => __('cart')['cart_empty']]);
        }

        $totalAmount = $cart->products->sum(fn ($product) => $product->pivot->price * $product->pivot->quantity);
        $totalDiscount = $cart->products->sum(fn ($product) => ($product->pivot->real_price - $product->pivot->price) * $product->pivot->quantity);

        $payWithCard = (int) request('payment_method') === OrderPaymentMethod::CARD->value;

        $order = Order::create([
            'user_id' => $user->id,
            'shipping_address_id' => $user->address->id ?? null,
            'cart_id' => $cart->id,
            'user_ip' => request()->ip(),
            'amount' => $totalAmount + $totalDiscount,
            'shipping' => request('shipping') ?? 0,
            'discount' => $totalDiscount,
            'total' => $totalAmount + request('shipping') ?? 0,
            'status' => $payWithCard ? OrderStatus::PENDING : OrderStatus::CREATED,
            'payment_method' => request('payment_method'),
        ]);

        (new UpdateOrderProducts)->execute($order, $cart);

        if (! $payWithCard) {
            OrderCreated::dispatch($order);
        }

        return $order;
    }
}
