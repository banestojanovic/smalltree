<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;

    public bool $site_active;

    public array $hero_image;

    public array $hero_title;

    public array $hero_subtitle;

    public static function group(): string
    {
        return 'general';
    }
}
