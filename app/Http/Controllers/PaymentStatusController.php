<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\OrderStatus;
use Cubes\Nestpay\MerchantService;
use Cubes\Nestpay\Payment;
use Illuminate\Http\Request;

class PaymentStatusController extends Controller
{
    //
    public function success(MerchantService $merchantService, Request $request)
    {
        $payment = null;
        $ex = null;

        try {
            $payment = $merchantService->paymentProcess3DGateResponse($request->all());
        } catch (\Cubes\Nestpay\PaymentAlreadyProcessedException $ex) {
            $ex = null;
        } catch (\Exception $ex) {
        } finally {
            try {
                $payment = $merchantService->getWorkingPayment();
            } catch (\Exception $exTemp) {
            }
        }

        if ($ex && config('app.debug')) {
            throw $ex;
        }

        $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->firstOrFail();

        return redirect()->route('orders.summary', ['uuid' => $order->uuid]);
    }

    public function fail(MerchantService $merchantService, Request $request)
    {
        $payment = null;
        $ex = null;

        try {
            $payment = $merchantService->paymentProcess3DGateResponse($request->all());

        } catch (\Cubes\Nestpay\PaymentAlreadyProcessedException $ex) {
            //the payment has been already processed
            //this error occures if customer refresh result page
            //add code here for the case if necessary
            $ex = null; //comment this if you want to show this exception if debug is on

        } catch (\Exception $ex) {
            //any other error
            //add code here for the case if necessary

        } finally {
            //try to get working payment

            try {
                $payment = $merchantService->getWorkingPayment();
            } catch (\Exception $exTemp) {
            }
        }

        if ($ex && config('app.debug')) {
//            throw $ex;
        }

        if ($ex) {
            $order = Order::where('id', $payment->getProperty(Payment::PROP_INVOICENUMBER))->firstOrFail();
            if ($order) {
                $order->status = OrderStatus::DECLINED;
                $order->save();
            }
        }

        return redirect()->route('payment_failed.show');
    }

    public function paymentFailed(Request $request): \Inertia\Response|\Inertia\ResponseFactory
    {

        return inertia('payments/failed')->with('error', 'placanje neuspesno');
    }
}
