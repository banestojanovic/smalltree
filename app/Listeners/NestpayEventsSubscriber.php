<?php

namespace App\Listeners;

use App\CartStatus;
use App\Data\OrderData;
use App\Mail\NewOrder;
use App\Mail\NewOrderAdmin;
use App\Mail\PaymentAttempted;
use App\Models\Cart;
use App\Models\Order;
use App\OrderStatus;
use Cubes\Nestpay\Laravel\NestpayPaymentProcessedErrorEvent;
use Cubes\Nestpay\Laravel\NestpayPaymentProcessedFailedEvent;
use Cubes\Nestpay\Laravel\NestpayPaymentProcessedSuccessfullyEvent;
use Cubes\Nestpay\Payment;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Mail;

class NestpayEventsSubscriber
{
    /**
     * Successfull payment
     */
    public function nestpayPaymentProcessedSuccessfullyEvent(NestpayPaymentProcessedSuccessfullyEvent $event)
    {
        $payment = $event->getPayment();

        $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->with(['user', 'shippingAddress', 'items.product.cover'])->firstOrFail();
        $cart = Cart::where('id', $order->cart_id)->firstOrFail();

        $order->status = OrderStatus::PAID;
        $order->save();

        $cart->status = CartStatus::FULFILLED;
        $cart->save();

        Mail::to($order->user->email)->send(new PaymentAttempted(payment: $payment));
        Mail::to($order->user->email)->send(new NewOrder(order: OrderData::optional($order)));
        Mail::to('salon.de.the.beograd@gmail.com')->send(new NewOrderAdmin(order: OrderData::optional($order)));
    }

    /**
     * Failed payment
     */
    public function nestpayPaymentProcessedFailedEvent(NestpayPaymentProcessedFailedEvent $event)
    {
        $payment = $event->getPayment();

        $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->with(['user', 'shippingAddress', 'items.product.cover'])->firstOrFail();
        $order->status = OrderStatus::CANCELLED;
        $order->save();

        Mail::to($order->user->email)->send(new PaymentAttempted(payment: $payment));
        Mail::to($order->user->email)->send(new NewOrder(order: OrderData::optional($order), success: false));
    }

    /**
     * Error processing payment
     */
    public function nestpayPaymentProcessedErrorEvent(NestpayPaymentProcessedErrorEvent $event)
    {
        $payment = $event->getPayment();
        if ($payment) {
            $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->firstOrFail();
            $order->status = OrderStatus::CANCELLED;
            $order->save();
        }
        $ex = $event->getException();
    }

    /**
     * Register the listeners for the subscriber.
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(
            'Cubes\Nestpay\Laravel\NestpayPaymentProcessedSuccessfullyEvent',
            'App\Listeners\NestpayEventsSubscriber@nestpayPaymentProcessedSuccessfullyEvent'
        );

        $events->listen(
            'Cubes\Nestpay\Laravel\NestpayPaymentProcessedFailedEvent',
            'App\Listeners\NestpayEventsSubscriber@nestpayPaymentProcessedFailedEvent'
        );

        $events->listen(
            'Cubes\Nestpay\Laravel\NestpayPaymentProcessedErrorEvent',
            'App\Listeners\NestpayEventsSubscriber@nestpayPaymentProcessedErrorEvent'
        );
    }
}
