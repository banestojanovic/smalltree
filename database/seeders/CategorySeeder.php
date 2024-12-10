<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Spatie\Tags\Tag;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = collect([
            'Crni čaj',
            'Zeleni čaj',
            'Bel čaj',
            'Voćni čaj',
            'Oolong čaj',
            'Pu erh čaj',
            'Herbalni čaj',
            'Rooibos i biljni čajevi',
            'Matcha',
            'Yerba Mate čaj',
            'Kombucha čaj',
            'Mate',
            'Ayurvedic čaj',
            'Med',
        ]);

        $categories->each(function ($category) {
            Category::factory()
                ->count(1)
                ->state(new Sequence(
                    ['name' => $category]
                ))
                ->create();
        });

        Tag::create(['name' => 'Crni čaj']);
        Tag::create(['name' => 'Aromatizovani crni čaj']);
        Tag::create(['name' => 'Zeleni čaj']);
        Tag::create(['name' => 'Aromatizovani zeleni čaj']);
        Tag::create(['name' => 'Beli čaj']);
        Tag::create(['name' => 'Oolong čaj']);
        Tag::create(['name' => 'Aromatizovani Oolong čaj']);
        Tag::create(['name' => 'Biljni Mate čaj']);
        Tag::create(['name' => 'Aromatizovani biljni Mate']);
        Tag::create(['name' => 'Rooibos']);
        Tag::create(['name' => 'Biljni ayurvedic čaj']);
        Tag::create(['name' => 'Aromatizovani voćni čaj']);
        Tag::create(['name' => 'Artisan Tea']);
        Tag::create(['name' => 'Vaš Matcha ritual']);
        Tag::create(['name' => 'Med Bagrem']);
        Tag::create(['name' => 'Med Suncokret']);
        Tag::create(['name' => 'bez dodate arome']);
        Tag::create(['name' => 'organski čajevi']);
    }
}
