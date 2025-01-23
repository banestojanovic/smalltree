<?php

return [
    'merchant' => [
        'clientId' => env('NESTPAY_MERCHANT_CLIENT_ID', ''),
        'storeKey' => env('NESTPAY_MERCHANT_STORE_KEY', ''),
        'storeType' => env('NESTPAY_MERCHANT_STORE_TYPE', '3D_PAY_HOSTING'),
        'okUrl' => env('NESTPAY_MERCHANT_OK_URL', ''),
        'failUrl' => env('NESTPAY_MERCHANT_FAIL_URL', ''),
        '3DGateUrl' => env('NESTPAY_MERCHANT_3D_GATE_URL', 'https://testsecurepay.eway2pay.com/fim/est3Dgate'),

        'apiName' => env('NESTPAY_MERCHANT_API_USERNAME', ''),
        'apiPassword' => env('NESTPAY_MERCHANT_API_PASSWORD', ''),
        'apiEndpointUrl' => env('NESTPAY_MERCHANT_API_ENDPOINT_URL', 'https://testsecurepay.eway2pay.com/fim/api'),
    ],

    'throwExceptions' => true,

    'paymentModel' => \App\Models\NestpayPayment::class,

    'unprocessed_payments_not_before' => 900,

    'unprocessed_payments_time_to_live' => 432000,

    'unprocessed_payments_api_call_timeout' => 2,
];
