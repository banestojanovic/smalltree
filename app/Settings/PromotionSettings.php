<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class PromotionSettings extends Settings
{
    public array $promoted_products = [];

    public static function group(): string
    {
        return 'general';
    }
}
