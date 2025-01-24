<?php

namespace App\Listeners;

use App\CartStatus;
use App\Data\OrderData;
use App\Events\OrderCreated;
use App\Mail\NewOrder;
use App\OrderStatus;
use App\Support\Cart;
use Illuminate\Support\Facades\Mail;

class OrderCreatedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderCreated $event): void
    {
        $order = $event->order;

        if ($order->status === OrderStatus::PAID || $order->status === OrderStatus::CREATED) {
            $order->load('user', 'shippingAddress', 'items.product.cover');
            Mail::to($order->user->email)->send(new NewOrder(order: OrderData::optional($order)));

            $cart = (new Cart)->getCart();
            if ($cart) {
                $cart->status = CartStatus::FULFILLED;
                $cart->save();
            }
        }
    }
}
