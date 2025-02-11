<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.site_name', 'SmallTree');
        $this->migrator->add('general.site_active', true);
        $this->migrator->add('general.hero_title', ['sr' => 'Vaša šoljica čaja']);
        $this->migrator->add('general.hero_subtitle', ['sr' => 'Savršen napitak za svaki dan']);
        $this->migrator->add('general.hero_image', []);
    }
};
