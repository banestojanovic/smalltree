<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'variation_id' => 'nullable|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = (new \App\Support\Cart)->getOrCreateCart();

        $qty = request('quantity', 1);

        $existing = $cart->products()
            ->wherePivot('product_id', request('product_id'))
            ->wherePivot('product_variation_id', request('variation_id'))
            ->first();

        if ($existing) {

            if ($existing->pivot->quantity + $qty > $existing->stock) {
                return back()->with('error', __('cart')['item_quantity_exceeds_stock']);
            }

            $cart->products()->updateExistingPivot(request('product_id'), [
                'product_variation_id' => request('variation_id'),
                'quantity' => $existing->pivot->quantity + $qty,
            ]);
        } else {
            $cart->products()->syncWithoutDetaching([
                request('product_id') => [
                    'product_variation_id' => request('variation_id'),
                    'quantity' => $qty,
                ],
            ]);
        }

        return back()->with(['success' => __('cart')['item_added_to_cart'], 'action' => 'cart.updated']);
    }

    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'variation_id' => 'nullable|integer',
        ]);

        $cart = (new \App\Support\Cart)->getOrCreateCart();

        if ($request->has('variation_id')) {
            $cart->products()
                ->wherePivot('product_id', request('product_id'))
                ->wherePivot('product_variation_id', request('variation_id'))
                ->detach();
        } else {
            $cart->products()
                ->wherePivot('product_id', request('product_id'))
                ->detach();
        }

        return back()->with('success', __('cart')['item_removed_from_cart']);
    }

    public function updateQuantity(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'variation_id' => 'nullable|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = (new \App\Support\Cart)->getOrCreateCart();

        $existing = $cart->products()
            ->wherePivot('product_id', request('product_id'))
            ->when(request()->has('product_variation_id'), function ($query) {
                return $query->wherePivot('product_variation_id', request('variation_id'));
            })
            ->first();

        if (!$existing) {
            return back()->with('error', __('cart')['item_quantity_not_updated']);
        }

        $cart->products()->updateExistingPivot(request('product_id'), [
            'product_variation_id' => request('variation_id'),
            'quantity' => request('quantity'),
        ]);

        return back()->with('success', __('cart')['item_quantity_updated']);
    }
}
