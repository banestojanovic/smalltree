<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum PostStatus: int implements HasLabel
{
    case INACTIVE = 0;
    case ACTIVE = 1;
    case DRAFT = 2;
    case TRASHED = 3;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::INACTIVE => __('enums')['post']['status']['inactive'],
            self::ACTIVE => __('enums')['post']['status']['active'],
            self::DRAFT => __('enums')['post']['status']['draft'],
            self::TRASHED => __('enums')['post']['status']['trashed'],
        };
    }
}
