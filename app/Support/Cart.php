<?php

namespace App\Support;

use App\CartStatus;

class Cart
{
    public function cartSession()
    {
        return 'cart_'.(auth()->id() ?: session()->getId());
    }

    public function getCart()
    {
        return \App\Models\Cart::with('products', 'products.variations')->where('status', CartStatus::ACTIVE)->where('session', $this->cartSession())->first();
    }

    public function getOrCreateCart()
    {
        return \App\Models\Cart::query()
            ->with('products')
            ->where('status', CartStatus::ACTIVE)
            ->firstOrCreate([
                'session' => $this->cartSession(),
            ]);
    }
}
