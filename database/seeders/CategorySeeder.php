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
                ->cover()
                ->create();
        });

        $tags = collect([
            'Crni čaj',
            'Aromatizovani crni čaj',
            'Zeleni čaj',
            'Aromatizovani zeleni čaj',
            'Beli čaj',
            'Oolong čaj',
            'Aromatizovani Oolong čaj',
            'Biljni Mate čaj',
            'Aromatizovani biljni Mate',
            'Rooibos',
            'Biljni ayurvedic čaj',
            'Aromatizovani voćni čaj',
            'Artisan Tea',
            'Vaš Matcha ritual',
            'Med Bagrem',
            'Med Suncokret',
            'bez dodate arome',
            'organski čajevi',
        ]);

        $tags->each(function ($tag) {
            Tag::findOrCreate($tag);
        });
    }
}
