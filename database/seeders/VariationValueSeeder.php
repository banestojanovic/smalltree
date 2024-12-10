<?php

namespace Database\Seeders;

use App\Models\VariationValue;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class VariationValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VariationValue::factory()->count(3)
            ->state(new Sequence(fn ($sequence) => ['value' => '50g'],
                ['value' => '100g', 'is_default' => true],
                ['value' => '250g'],
            ))
            ->create();
    }
}
