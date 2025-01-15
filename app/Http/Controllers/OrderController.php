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
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'email' => 'required|email',
            'city' => 'required',
            'postal_code' => 'required',
            'payment_method' => 'required|integer',
        ]);

        if ($validation->fails()) {
            return back()->with(['error' => $validation->errors()->first()]);
        }

        $cart = (new \App\Support\Cart)->getCart();

        if (! $cart) {
            return back()->with('error', __('cart')['cart_empty']);
        }

        $user = User::where('email', $request->email)->first();
        if (! $user) {
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

        $totalAmount = $cart->products->sum(fn ($product) => $product->pivot->price * $product->pivot->quantity);
        $totalDiscount = $cart->products->sum(fn ($product) => ($product->pivot->real_price - $product->pivot->price) * $product->pivot->quantity);

        if ($cart->products->contains(fn ($product) => $product->stock_status === ProductStockStatus::OUT_OF_STOCK)) {
            return back()->with('error', __('cart')['item_out_of_stock']);
        }

        if ($cart->products->contains(fn ($product) => $product->stock !== null && $product->pivot->quantity > $product->stock)) {
            return back()->with('error', __('cart')['item_quantity_exceeds_stock']);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'shipping_address_id' => $address->id,
            'cart_id' => $cart->id,
            'user_ip' => $request->ip(),
            'amount' => $totalAmount + $totalDiscount,
            'shipping' => $request->shipping ?? 0,
            'discount' => $totalDiscount,
            'total' => $totalAmount + $request->shipping ?? 0,
            'status' => OrderStatus::PENDING,
            'payment_method' => $request->payment_method,
        ]);

        foreach ($cart->products as $product) {
            $stockPosition = $product->stock - $product->pivot->quantity;

            $order->items()->create([
                'product_id' => $product->id,
                'product_variation_id' => $product->pivot->product_variation_id,
                'quantity' => $product->pivot->quantity,
                'price' => $product->pivot->price,
                'discount' => 0,
                'tax' => 0,
            ]);

            if ($product->stock !== null) {
                $product->update([
                    'stock' => $stockPosition,
                    'stock_status' => $stockPosition > 0 ? ProductStockStatus::IN_STOCK : ProductStockStatus::OUT_OF_STOCK,
                ]);
            }
        }

        $cart->update(['status' => CartStatus::INACTIVE]);

        return redirect()->route('orders.summary', $order->uuid)->with('success', __('order')['order_created']);
    }

    public function summary($uuid): \Inertia\Response|\Inertia\ResponseFactory
    {
        $order = Order::where('uuid', $uuid)->with('items.product.cover', 'user', 'shippingAddress')->firstOrFail();

        return inertia('order/summary', [
            'order' => OrderData::from($order),
        ]);
    }
}
