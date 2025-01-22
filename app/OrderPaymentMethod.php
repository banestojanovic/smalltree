<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum OrderPaymentMethod: int implements HasLabel
{
    case CARD = 1;

    case UPON_DELIVERY = 2;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::CARD => __('enums.payment_method.cart'),
            self::UPON_DELIVERY => __('enums.payment_method.upon_delivery'),
        };
    }
}
