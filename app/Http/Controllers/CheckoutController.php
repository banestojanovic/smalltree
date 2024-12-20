<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class CheckoutController extends Controller
{
    public function show()
    {
        $cart = (new \App\Support\Cart)->getOrCreateCart();
        if (!$cart || !$cart->products || count($cart->products) < 1) {
            return redirect()->route('home')->with('error', __('cart')['cart_empty']);
        }
        return inertia('checkout/show');
    }

}
