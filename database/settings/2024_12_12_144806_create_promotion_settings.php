<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.promoted_products', []);

        $this->migrator->add('general.tea_of_the_month_title', ['sr' => 'Čaj meseca']);
        $this->migrator->add('general.tea_of_the_month_subtitle', ['sr' => 'Ovaj mesec je najviše njih uživalo u ovom čaju']);
        $this->migrator->add('general.tea_of_the_month_products', []);
        $this->migrator->add('general.tea_of_the_month_bg_image', []);

        $this->migrator->add('general.special_offer_title', ['sr' => 'Specijalna ponuda']);
        $this->migrator->add('general.special_offer_subtitle', ['sr' => 'Ovo je preporučeni proizvod na akciji']);
        $this->migrator->add('general.special_offer_products', []);
        $this->migrator->add('general.special_offer_bg_image', []);
    }
};
