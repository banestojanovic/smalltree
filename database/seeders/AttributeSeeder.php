<?php

namespace Database\Seeders;

use App\Models\Attribute;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Attribute::factory()->count(6)
            ->state(new Sequence(fn ($sequence) => ['name' => 'Size'],
                ['name' => 'Country'],
                ['name' => 'Caffeine'],
                ['name' => 'Preparation'],
                ['name' => 'Infusions'],
                ['name' => 'Allergens'],
            ))
            ->create();
    }
}
