<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\ProductStockStatus;
use Illuminate\Support\Facades\Validator;

class BuyNowController extends Controller
{
    public function __invoke()
    {
        $validation = Validator::make(request()->all(), [
            'product_id' => 'required|exists:products,id',
            'price' => 'required|numeric|min:0',
            'real_price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validation->fails()) {
            return back()->with('error', $validation->errors()->first());
        }

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

        if (! $existing) {
            $cart->products()->attach([
                request('product_id') => [
                    'product_variation_id' => request('variation_id'),
                    'price' => request('price'),
                    'real_price' => request('real_price') > 0 ? request('real_price') : null,
                    'quantity' => request('quantity'),
                ],
            ]);
        }

        return to_route('checkout.show');
    }
}
