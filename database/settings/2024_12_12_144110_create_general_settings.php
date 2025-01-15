<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.site_name', 'SmallTree');
        $this->migrator->add('general.site_active', true);
        $this->migrator->add('general.hero_title', ['sr' => 'Šolja čaja za uspešnu 2025. godinu']);
        $this->migrator->add('general.hero_subtitle', ['sr' => 'Želimo vam srećne novogodišnje i božićne praznike']);
        $this->migrator->add('general.hero_image', []);
    }
};
