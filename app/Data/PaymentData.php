<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class PaymentData extends Data
{
    public function __construct(
        public int $id,
        public int $processed,
        public string $invoice,
        public string $card,
        public string $oid,
        public ?string $authAttrCode,
        public ?string $procCode,
        public ?string $responseCode,
        public ?string $md,
        public string $masked,
    ) {}
}
