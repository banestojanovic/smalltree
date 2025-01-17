<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Cache;
use Spatie\LaravelSettings\Events\SettingsSaved;

class ClearSettingsCache
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SettingsSaved $event): void
    {
        Cache::forget('transformed_product_packages');
    }
}
