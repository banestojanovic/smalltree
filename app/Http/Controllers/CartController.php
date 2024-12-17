<?php

namespace App\Http\Controllers;

use App\Data\CartData;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function cartItems()
    {
        $cart = (new \App\Support\Cart)->getOrCreateCart();

        return CartData::from($cart);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'variation_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = (new \App\Support\Cart)->getOrCreateCart();

        $product = Product::active()->isAvailable()->findOrFail($request->get('product_id'));

        // Check if the product with the variation already exists in the cart
        $cartProduct = $cart->products()
            ->wherePivot('variation_id', $request->get('variation_id'))
            ->wherePivot('product_id', $product->id)
            ->first();

        if ($cartProduct) {
            // Update quantity if product already exists in the cart
            $cart->products()->updateExistingPivot($product->id, [
                'variation_id' => $request->get('variation_id'),
                'quantity' => $cartProduct->pivot->quantity + $request->get('quantity'),
            ]);
        } else {
            // Add new product to the cart
            $cart->products()->attach($product->id, [
                'variation_id' => $request->get('variation_id'),
                'quantity' => $request->get('quantity'),
            ]);
        }

        if ($request->wantsJson()) {
            return $cart;
        }

        return back()->with('success', __('enums.cart.item_added_to_cart'));
    }
}
