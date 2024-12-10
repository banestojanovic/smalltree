<?php

namespace App\Support;

use App\CartStatus;
use Illuminate\Support\Str;

class Cart
{
    public function cartSession()
    {
        return 'cart_'.(auth()->id() ?: session()->getId());
    }

    public function getCart()
    {
        return \App\Models\Cart::where('status', CartStatus::ACTIVE)->where('session', $this->cartSession())->first();
    }

    public function getOrCreateCart()
    {
        return \App\Models\Cart::with('products')
            ->where('status', CartStatus::ACTIVE)
            ->firstOrCreate(['session' => $this->cartSession()], ['hash' => Str::random()]);
    }
}
