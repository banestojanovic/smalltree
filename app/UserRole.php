<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum UserRole: int implements HasLabel
{
    case SUPER_ADMIN = 1;
    case ADMIN = 2;
    case SUPPORT = 3;
    case USER = 4;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::SUPER_ADMIN => __('enums')['user']['roles']['super_admin'],
            self::ADMIN => __('enums')['user']['roles']['admin'],
            self::SUPPORT => __('enums')['user']['roles']['support'],
            self::USER => __('enums')['user']['roles']['user'],
        };
    }
}
