<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum ProductStockStatus: int implements HasLabel
{
    case OUT_OF_STOCK = 0;
    case IN_STOCK = 1;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::OUT_OF_STOCK => __('enums')['product']['stock_status']['out_of_stock'],
            self::IN_STOCK => __('enums')['product']['stock_status']['in_stock'],
        };
    }
}
