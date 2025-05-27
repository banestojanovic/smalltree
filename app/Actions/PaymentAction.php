<?php

namespace App\Actions;

use App\Models\Order;
use Cubes\Nestpay\MerchantService;

class PaymentAction
{
    public function execute(Order $order, MerchantService $merchantService)
    {
        $data = [
            \Cubes\Nestpay\Payment::PROP_TRANTYPE => \Cubes\Nestpay\Payment::TRAN_TYPE_AUTH,

            \Cubes\Nestpay\Payment::PROP_AMOUNT => $order->total,
            \Cubes\Nestpay\Payment::PROP_CURRENCY => \Cubes\Nestpay\Payment::CURRENCY_RSD,
            \Cubes\Nestpay\Payment::PROP_BILLTONAME => request('first_name').' '.request('last_name'),
            \Cubes\Nestpay\Payment::PROP_EMAIL => config('mail.from.address', 'office@smalltree.rs'),

            \Cubes\Nestpay\Payment::PROP_LANG => app()->getLocale(),

            \Cubes\Nestpay\Payment::PROP_INVOICENUMBER => $order->id,
            \Cubes\Nestpay\Payment::PROP_DESCRIPTION => 'Small Tree - Porudžbina',

            \Cubes\Nestpay\Payment::PROP_BILLTOSTREET1 => request('address'),
            \Cubes\Nestpay\Payment::PROP_BILLTOCITY => request('city'),
            \Cubes\Nestpay\Payment::PROP_BILLTOCOUNTRY => 'Srbija',
            \Cubes\Nestpay\Payment::PROP_TEL => request('phone'),
        ];

        $merchantService->getMerchantConfig()->setConfig([
            'okUrl' => route('nestpay.success'),
            'failUrl' => route('nestpay.fail'),
        ]);

        return $merchantService->paymentMakeRequestParameters($data);
    }
}
