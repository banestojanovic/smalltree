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
            ['name' => 'Crni čajevi', 'parent_id' => null], // 1
            ['name' => 'Pu erh čajevi', 'parent_id' => null],
            ['name' => 'Oolong čajevi', 'parent_id' => null],
            ['name' => 'Beli čajevi', 'parent_id' => null],
            ['name' => 'Zeleni čajevi', 'parent_id' => null],
            ['name' => 'Artisan', 'parent_id' => null], // 6
            ['name' => 'Matcha', 'parent_id' => null],
            ['name' => 'Voćne mešavine', 'parent_id' => null],
            ['name' => 'Rooibos i biljni čajevi', 'parent_id' => null],
            ['name' => 'Mate', 'parent_id' => null],
            ['name' => 'Ayurvedic čajevi', 'parent_id' => null],
            ['name' => 'Organski čajevi', 'parent_id' => null], // 12
            ['name' => 'Pribor', 'parent_id' => null],
            ['name' => 'Med', 'parent_id' => null],
            ['name' => 'Korporativni pokloni', 'parent_id' => null], // 15

            ['name' => 'Matcha čaj', 'parent_id' => 7],

            ['name' => 'Matcha čaj', 'parent_id' => 7],
            ['name' => 'Matcha pribor', 'parent_id' => 7],
            ['name' => 'Matcha set', 'parent_id' => 7],

            ['name' => 'Mate čaj', 'parent_id' => 10], // 20
            ['name' => 'Mate pribor', 'parent_id' => 10],
            ['name' => 'Mate set', 'parent_id' => 10],

            ['name' => 'Šolje i čajnici', 'parent_id' => 13],
            ['name' => 'Setovi za čaj', 'parent_id' => 13],
            ['name' => 'Kutije za čaj', 'parent_id' => 13], // 25
            ['name' => 'Specijalni dodaci', 'parent_id' => 13],
            ['name' => 'Knjige', 'parent_id' => 13],

            ['name' => 'Čist crni čaj', 'parent_id' => 1],
            ['name' => 'Aromatizovani crni čaj', 'parent_id' => 1],

            ['name' => 'Pu erh', 'parent_id' => 2], // 30
            ['name' => 'Pu erh vulcano', 'parent_id' => 2],
            ['name' => 'Pu erh special', 'parent_id' => 2],

            ['name' => 'Formosa', 'parent_id' => 3],
            ['name' => 'Ti kuan', 'parent_id' => 3],
            ['name' => 'Milk', 'parent_id' => 3], // 35

            ['name' => 'Aromatizovani beli čaj', 'parent_id' => 4],
            ['name' => 'Pai Mu', 'parent_id' => 4],
            ['name' => 'White pu erh', 'parent_id' => 4],
            ['name' => 'CJDPP', 'parent_id' => 4],

            ['name' => 'Čist zeleni čaj', 'parent_id' => 5], // 40
            ['name' => 'Aromatizovani zeleni čaj', 'parent_id' => 5],

            ['name' => 'Brusnica', 'parent_id' => 8],
            ['name' => 'Fruite', 'parent_id' => 8],

            ['name' => 'Med Suncokret', 'parent_id' => 14],
            ['name' => 'Med Bagrem', 'parent_id' => 14], // 45

            ['name' => 'Infuzeri i dodaci za pripremu čaja', 'parent_id' => 13],

            ['name' => 'Shou Mei', 'parent_id' => 4],

            ['name' => 'Pu erh superior', 'parent_id' => 2],

            ['name' => 'Aromatizovani voćni čaj', 'parent_id' => 8],
        ]);

        $categories->each(function ($category) {
            Category::factory()
                ->count(1)
                ->state(new Sequence(
                    ['name' => $category['name'], 'parent_id' => $category['parent_id']]
                ))
                ->cover()
                ->create();
        });
    }
}
