<?php

namespace App;

use Filament\Support\Contracts\HasLabel;

enum AttributeType: int implements HasLabel
{
    case SELECT = 1;
    case INPUT = 2;
    case CHECKBOX = 3;

    public function getLabel(): ?string
    {
        return match ($this) {
            self::SELECT => 'Select',
            self::INPUT => 'Input',
            self::CHECKBOX => 'Checkbox',
        };
    }
}
