<?php

namespace App\Http\Controllers;

class CheckoutController extends Controller
{
    public function show()
    {
        $cart = (new \App\Support\Cart)->getCart();
        if (! $cart || ! $cart->products || count($cart->products) < 1) {
            return redirect()->route('home')->with('error', __('cart')['cart_empty']);
        }

        return inertia('checkout/show');
    }
}
