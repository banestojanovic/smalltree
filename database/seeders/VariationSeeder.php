<?php

namespace Database\Seeders;

use App\Models\Variation;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class VariationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Variation::factory()->count(1)
            ->state(new Sequence(fn ($sequence) => ['name' => 'Pakovanje']))
            ->create();
    }
}
