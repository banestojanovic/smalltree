<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class PromotionSettings extends Settings
{
    public array $action_products = [];

    public array $promoted_products = [];

    public array $tea_of_the_month_title;

    public array $tea_of_the_month_subtitle;

    public array $tea_of_the_month_products;

    public array $tea_of_the_month_bg_image;

    public array $special_offer_title;

    public array $special_offer_subtitle;

    public array $special_offer_products;

    public array $special_offer_bg_image;

    public static function group(): string
    {
        return 'general';
    }
}
