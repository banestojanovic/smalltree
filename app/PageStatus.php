<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum PageStatus: int implements HasLabel
{
    case INACTIVE = 0;
    case ACTIVE = 1;
    case DRAFT = 2;
    case TRASHED = 3;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::INACTIVE => __('enums')['page']['status']['inactive'],
            self::ACTIVE => __('enums')['page']['status']['active'],
            self::DRAFT => __('enums')['page']['status']['draft'],
            self::TRASHED => __('enums')['page']['status']['trashed'],
        };
    }
}
