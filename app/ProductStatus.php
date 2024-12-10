<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum ProductStatus: int implements HasLabel
{
    case INACTIVE = 0;
    case ACTIVE = 1;
    case DRAFT = 2;
    case TRASHED = 3;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::INACTIVE => __('enums')['product']['status']['inactive'],
            self::ACTIVE => __('enums')['product']['status']['active'],
            self::DRAFT => __('enums')['product']['status']['draft'],
            self::TRASHED => __('enums')['product']['status']['trashed'],
        };
    }
}
