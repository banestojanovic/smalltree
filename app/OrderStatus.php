<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum OrderStatus: int implements HasLabel
{
    case PENDING = 0;

    case CREATED = 1;

    case COMPLETED = 2;

    case PAID = 3;

    case CANCELLED = 4;

    case DECLINED = 5;

    case SENT = 6;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::SENT => __('enums.order.status.sent'),
            self::CREATED => __('enums.order.status.created'),
            self::COMPLETED => __('enums.order.status.completed'),
            self::PAID => __('enums.order.status.paid'),
            self::DECLINED => __('enums.order.status.declined'),
            self::CANCELLED => __('enums.order.status.cancelled'),
            self::PENDING => __('enums.order.status.pending'),
        };
    }

    public function getColor(): ?string
    {
        return match ($this) {
            self::CREATED, self::PENDING, self::PAID,
            self::SENT, self::COMPLETED => 'text-green-700',
            self::DECLINED, self::CANCELLED => 'text-red-600',
        };
    }
}
