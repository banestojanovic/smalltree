<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\ProductStockStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'price' => 'required|numeric',
            'variation_id' => 'nullable|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $productFromDB = Product::with('variations')->findOrFail(request('product_id'));

        if ($productFromDB->stock_status == ProductStockStatus::OUT_OF_STOCK) {
            return back()->with('error', __('cart')['item_out_of_stock']);
        }

        $cart = (new \App\Support\Cart)->getOrCreateCart();

        $qty = request('quantity', 1);

        $query = $cart->products()->wherePivot('product_id', request('product_id'));

        if (request('variation_id')) {
            $query->wherePivot('product_variation_id', request('variation_id'));
        }

        $existing = $query->first();

        if ($existing) {
            if ($existing->stock !== null && $existing->pivot->quantity + $qty > $existing->stock) {
                return back()->with('error', __('cart')['item_quantity_exceeds_stock']);
            }

            DB::transaction(fn () => DB::table('cart_product')
                ->where('id', $existing->pivot->id)
                ->update([
                    'product_variation_id' => request('variation_id'),
                    'price' => request('price'),
                    'real_price' => request('real_price') > 0 ? request('real_price') : null,
                    'quantity' => $existing->pivot->quantity + $qty,
                ])
            );
        } else {
            $cart->products()->attach([
                request('product_id') => [
                    'product_variation_id' => request('variation_id'),
                    'price' => request('price'),
                    'real_price' => request('real_price') > 0 ? request('real_price') : null,
                    'quantity' => $qty,
                ],
            ]);
        }

        return back()->with(['success' => __('cart')['item_added_to_cart'], 'action' => 'cart.updated']);
    }

    public function storeGrouped(Request $request)
    {
        $request->validate([
            'products' => 'required|array',
        ]);

        $productsFromDB = Product::whereIn('id', request('products'))->get();

        $cart = (new \App\Support\Cart)->getOrCreateCart();

        $qty = request('quantity', 1);

        foreach ($productsFromDB as $product) {
            if ($product->stock_status == ProductStockStatus::OUT_OF_STOCK) {
                return back()->with('error', __('cart.specific_item_out_of_stock', ['product' => $product->name]));
            }

            if ($product->price < 1) {
                return back()->with('error', __('cart.specific_item_price_invalid', ['product' => $product->name]));
            }

            $query = $cart->products()->wherePivot('product_id', $product->id);

            $existing = $query->first();

            if ($existing) {
                if ($existing->stock !== null && $existing->pivot->quantity + $qty > $existing->stock) {
                    return back()->with('error', __('cart.specific_item_quantity_exceeds_stock', ['product' => $product->name]));
                }

                DB::transaction(fn () => DB::table('cart_product')
                    ->where('id', $existing->pivot->id)
                    ->update([
                        'product_variation_id' => null,
                        'price' => $product->price,
                        'real_price' => $product->price,
                        'quantity' => $existing->pivot->quantity + $qty,
                    ])
                );
            } else {
                $cart->products()->attach([
                    $product->id => [
                        'product_variation_id' => null,
                        'price' => $product->price,
                        'real_price' => $product->price,
                        'quantity' => $qty,
                    ],
                ]);
            }
        }

        return back()->with(['success' => __('cart')['items_added_to_cart'], 'action' => 'cart.updated']);
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

        $product = $cart->products()->wherePivot('product_id', request('product_id'));

        if (request('variation_id')) {
            $product->wherePivot('product_variation_id', request('variation_id'));
        }

        $existing = $product->first();

        if (! $existing) {
            return back()->with('error', __('cart')['item_quantity_not_updated']);
        }

        if ($existing->stock_status == ProductStockStatus::OUT_OF_STOCK) {
            return back()->with('error', __('cart')['item_out_of_stock']);
        }

        if ($existing->stock !== null && $existing->pivot->quantity + request('quantity') > $existing->stock) {
            return back()->with('error', __('cart')['item_quantity_exceeds_stock']);
        }

        DB::transaction(fn () => DB::table('cart_product')
            ->where('id', $existing->pivot->id)
            ->update([
                'product_variation_id' => request('variation_id'),
                'quantity' => request('quantity'),
            ])
        );

        return back()->with('success', __('cart')['item_quantity_updated']);
    }

    public function open(Request $request)
    {
        return back()->with('action', 'cart.updated');
    }
}
