<?php

namespace App\Http\Controllers;

use App\Actions\CreateOrder;
use App\Actions\CreateUser;
use App\Data\OrderData;
use App\Models\Order;
use App\OrderPaymentMethod;
use Cubes\Nestpay\MerchantService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function store(Request $request, MerchantService $merchantService)
    {
        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'address' => 'required',
            'city' => 'required',
            'postal_code' => 'required',
            'payment_method' => 'required|integer',
            'terms' => 'required|accepted',
        ]);

        if ($validation->fails()) {
            return back()->with(['error' => $validation->errors()->first()])->withErrors($validation->errors());
        }

        try {
            $user = (new CreateUser)->execute();
            $order = (new CreateOrder)->execute(user: $user);

            if ($order->payment_method === OrderPaymentMethod::CARD) {
                $form = (new \App\Actions\PaymentAction)->execute(order: $order, merchantService: $merchantService);

                return back()->with([
                    'payment' => [
                        'pay_with_card' => true,
                        'paymentData' => $form,
                    ]
                ]);
            }
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->route('orders.summary', $order->uuid)->with('success', __('order')['order_created']);
    }

    public function summary($uuid): \Inertia\Response|\Inertia\ResponseFactory
    {
        $order = Order::where('uuid', $uuid)->with('payment', 'items.product.cover', 'user', 'shippingAddress')->firstOrFail();

        return inertia('order/summary', [
            'order' => OrderData::optional($order),
        ]);
    }
}
