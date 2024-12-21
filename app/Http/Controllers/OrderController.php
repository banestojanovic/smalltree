<?php

namespace App\Http\Controllers;

use App\CartStatus;
use App\Data\OrderData;
use App\Models\Order;
use App\Models\User;
use App\OrderStatus;
use App\ProductStockStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'email' => 'required|email',
            'city' => 'required',
            'postal_code' => 'required',
            'payment_method' => 'required|integer',
        ]);

        $cart = (new \App\Support\Cart)->getCart();

        if (!$cart) {
            return back()->with('error', __('cart')['cart_empty']);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $user = User::create([
                'email' => $request->email,
                'name' => "$request->first_name $request->last_name",
                'password' => Hash::make('password'),
            ]);
        }

        $address = $user->address()->updateOrCreate([
            'company' => $request->company,
            'phone' => $request->phone,
            'address_line_1' => $request->address_line_1,
            'address_line_2' => $request->address_line_2,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'is_default' => $request->is_default,
        ]);

        $totalAmount = 0;
        $totalDiscount = 0; // TODO: get the real discount

        foreach ($cart->products as $product) {
            $productVariation = $product->variations->where('id', $product->pivot->product_variation_id)->first();

            $totalAmount += $productVariation->price ?? $product->price;
            //            $totalAmount += $productVariation->discount ?? $product->discount;

            if ($product->pivot->quantity > $product->stock) {
                return back()->with('error', __('cart')['item_quantity_exceeds_stock']);
            }
        }

        // Save Order
        $order = Order::create([
            'user_id' => $user->id,
            'shipping_address_id' => $address->id,
            'cart_id' => $cart->id,
            'user_ip' => $request->ip(),
            'amount' => $totalAmount,
            'shipping' => $request->shipping ?? 0,
            'discount' => $totalDiscount,
            'total' => $totalAmount - $totalDiscount + $request->shipping ?? 0,
            'status' => OrderStatus::PENDING,
            'payment_method' => $request->payment_method,
        ]);

        foreach ($cart->products as $product) {
            $productVariation = $product->variations->where('id', $product->pivot->product_variation_id)->first();
            $stockPosition = $product->stock - $product->pivot->quantity;

            $order->items()->create([
                'product_id' => $product->id,
                'product_variation_id' => $product->pivot->product_variation_id,
                'quantity' => $product->pivot->quantity,
                'price' => $productVariation?->price ?? $product->price,
                'discount' => 0,
                'tax' => 0,
            ]);

            $product->update([
                'stock' => $stockPosition,
                'stock_status' => $stockPosition > 0 ? ProductStockStatus::IN_STOCK : ProductStockStatus::OUT_OF_STOCK,
            ]);
        }

        $cart->update(['status' => CartStatus::INACTIVE]);

        return redirect()->route('orders.summary', $order->id)->with('success', __('order')['order_created']);
    }

    public function summary($orderId)
    {
        $order = Order::with('items.product.cover', 'user', 'shippingAddress')->findOrFail($orderId);

        return inertia('order/summary', [
            'order' => OrderData::from($order),
        ]);
    }
}
