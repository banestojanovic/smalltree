<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Spatie\Tags\Tag;

class PostCategorySeeder extends Seeder
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
            PostCategory::factory()
                ->count(1)
                ->state(new Sequence(
                    ['name' => $category]
                ))
                ->create();
        });

        $teaTags = collect([
            'Loose Leaf Tea',
            'Organic Tea',
            'Caffeinated Teas',
            'Decaf Options',
            'Tea Health Tips',
            'Tea Brewing Guide',
            'Matcha',
            'Chai',
            'Iced Tea',
            'Tea Time Snacks',
            'Tea Collectibles',
            'Tea Tastings',
            'Teapot Maintenance',
            'Eco-Friendly Teas',
            'Artisanal Blends',
            'Tea for Sleep',
            'Tea for Energy',
            'Exotic Tea Blends',
            'Traditional Tea Rituals',
            'Tea Subscription Boxes',
        ]);

        $teaTags->each(function ($tag) {
            Tag::create(['name' => $tag]);
        });
    }
}
