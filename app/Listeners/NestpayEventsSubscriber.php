<?php

namespace App\Listeners;

use App\Models\Order;
use App\Models\Cart;
use App\OrderStatus;
use App\CartStatus;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Events\Dispatcher;
use Illuminate\Queue\InteractsWithQueue;

use Cubes\Nestpay\Laravel\NestpayPaymentProcessedSuccessfullyEvent;
use Cubes\Nestpay\Laravel\NestpayPaymentProcessedFailedEvent;
use Cubes\Nestpay\Laravel\NestpayPaymentProcessedErrorEvent;

use Cubes\Nestpay\Payment;

use App\Mail\NestpayPaymentMail;

class NestpayEventsSubscriber
{
    /**
     * Successfull payment
     */
    public function nestpayPaymentProcessedSuccessfullyEvent(NestpayPaymentProcessedSuccessfullyEvent $event)
    {
        $payment = $event->getPayment();

        //CUSTOMER HAS PAID, DO RELATED STUFF HERE
        $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->firstOrFail();
        $cart = Cart::where('id', $order->cart_id)->firstOrFail();

        $order->status = OrderStatus::PAID;
        $order->save();

        $cart->status = CartStatus::FULFILLED;
        $cart->save();

        //sending email
        \Mail::to(
            $payment->getProperty(Payment::PROP_EMAIL),
            $payment->getProperty(Payment::PROP_BILLTONAME)
        )->send(new NestpayPaymentMail($payment));
    }

    /**
     * Failed payment
     */
    public function nestpayPaymentProcessedFailedEvent(NestpayPaymentProcessedFailedEvent $event)
    {
        $payment = $event->getPayment();

        $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->firstOrFail();
        $order->status = OrderStatus::CANCELLED;
        $order->save();

        //sending email
        \Mail::to(
            $payment->getProperty(Payment::PROP_EMAIL),
            $payment->getProperty(Payment::PROP_BILLTONAME)
        )->send(new NestpayPaymentMail($payment));
    }

    /**
     * Error processing payment
     */
    public function nestpayPaymentProcessedErrorEvent(NestpayPaymentProcessedErrorEvent $event)
    {
        $payment = $event->getPayment(); //COULD BE NULL!!!
        if ($payment) {
            $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->firstOrFail();
            $order->status = OrderStatus::CANCELLED;
            $order->save();
        }
        $ex = $event->getException();
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  \Illuminate\Events\Dispatcher  $events
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
