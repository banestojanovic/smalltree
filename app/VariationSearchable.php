<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum VariationSearchable: int implements HasLabel
{
    case NO = 0;

    case YES = 1;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::NO => 'Nije',
            self::YES => 'Jeste',
        };
    }
}
