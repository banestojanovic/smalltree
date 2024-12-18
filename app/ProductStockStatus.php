<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

/**
 * Enum representing the stock status of a product
 */
enum ProductStockStatus: int implements HasLabel
{
    /**
     * Product is currently out of stock
     */
    case OUT_OF_STOCK = 0;

    /**
     * Product is currently in stock
     */
    case IN_STOCK = 1;

    /**
     * Get the human-readable label for the stock status
     */
    public function getLabel(): ?string
    {
        return match ($this) {
            self::OUT_OF_STOCK => __('enums')['product']['stock_status']['out_of_stock'],
            self::IN_STOCK => __('enums')['product']['stock_status']['in_stock'],
        };
    }
}
