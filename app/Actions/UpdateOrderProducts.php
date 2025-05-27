<?php

namespace App\Actions;

use App\CartStatus;
use App\Models\Cart;
use App\Models\Order;
use App\ProductStockStatus;
use Illuminate\Validation\ValidationException;

class UpdateOrderProducts
{
    /**
     * @throws ValidationException
     */
    public function execute(Order $order, Cart $cart): void
    {
        if ($cart->products->contains(fn ($product) => $product->stock_status === ProductStockStatus::OUT_OF_STOCK)) {
            throw ValidationException::withMessages(['cart' => __('cart')['item_out_of_stock']]);
        }

        if ($cart->products->contains(fn ($product) => $product->stock !== null && $product->pivot->quantity > $product->stock)) {
            throw ValidationException::withMessages(['cart' => __('cart')['item_out_of_stock']]);
        }

        foreach ($cart->products as $product) {
            $stockPosition = $product->stock - $product->pivot->quantity;

            $order->items()->create([
                'product_id' => $product->id,
                'product_variation_id' => $product->pivot->product_variation_id,
                'quantity' => $product->pivot->quantity,
                'price' => $product->pivot->price,
                'real_price' => $product->pivot->real_price,
                'discount' => $product->pivot->real_price - $product->pivot->price,
            ]);

            if ($product->stock !== null) {
                $product->update([
                    'stock' => $stockPosition,
                    'stock_status' => $stockPosition > 0 ? ProductStockStatus::IN_STOCK : ProductStockStatus::OUT_OF_STOCK,
                ]);
            }
        }

        // app|todo move to the order complete event.
        //        $cart->update(['status' => CartStatus::INACTIVE]);
    }
}
