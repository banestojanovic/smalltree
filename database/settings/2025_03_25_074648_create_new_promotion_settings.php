<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.new_title', ['sr' => 'Novo u ponudi']);
        $this->migrator->add('general.new_subtitle', ['sr' => 'Pogledajte naše nove proizvode koje smo dodali u ponudu']);
        $this->migrator->add('general.new_products', []);
        $this->migrator->add('general.new_bg_image', []);
    }
};
