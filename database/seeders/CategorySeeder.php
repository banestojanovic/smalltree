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
//        $categories = collect([
//            ['name' => 'Crni čaj', 'parent_id' => null],
//            ['name' => 'Pu erh', 'parent_id' => null],
//            ['name' => 'Aromatizovani crni čaj', 'parent_id' => 1],
//            ['name' => 'Ayurvedic čajevi', 'parent_id' => null],
//            ['name' => 'Zeleni čaj', 'parent_id' => null],
//            ['name' => 'Aromatizovani zeleni čaj', 'parent_id' => 5],
//            ['name' => 'Beli čaj', 'parent_id' => null],
//            ['name' => 'Aromatizovani beli čaj', 'parent_id' => 7],
//            ['name' => 'Oolong čaj', 'parent_id' => null],
//            ['name' => 'Aromatizovani oolong čaj', 'parent_id' => 9],
//            ['name' => 'Mate', 'parent_id' => null],
//            ['name' => 'Biljni mate čaj', 'parent_id' => 11],
//            ['name' => 'Aromatizovani biljni mate', 'parent_id' => 11],
//            ['name' => 'Rooibos i biljni čajevi', 'parent_id' => null],
//            ['name' => 'Rooibos', 'parent_id' => 14],
//            ['name' => 'Biljni ayurvedic čaj', 'parent_id' => 4],
//            ['name' => 'Voćni čaj', 'parent_id' => null],
//            ['name' => 'Aromatizovani voćni čaj', 'parent_id' => 17],
//            ['name' => 'Aromatizovni zeleni čaj', 'parent_id' => 5],
//            ['name' => 'Artisan tea', 'parent_id' => 7],
//            ['name' => 'Matcha', 'parent_id' => null],
//            ['name' => 'Vaš matcha ritual', 'parent_id' => 21],
//            ['name' => 'Biljni čaj rooibos', 'parent_id' => 14],
//            ['name' => 'Čajevi iz srbije', 'parent_id' => null],
//            ['name' => 'Biljni čajevi', 'parent_id' => null],
//            ['name' => 'Med', 'parent_id' => null],
//            ['name' => 'Med bagrem', 'parent_id' => 26],
//            ['name' => 'Med suncokret', 'parent_id' => 26],
//            ['name' => 'Pribor', 'parent_id' => null],
//            ['name' => 'Kutije za čaj', 'parent_id' => 29],
//            ['name' => 'Termosi i šolje za čaj', 'parent_id' => 29],
//            ['name' => 'Knjige', 'parent_id' => 29],
//            ['name' => 'Čajnici', 'parent_id' => 29],
//            ['name' => 'Set za čaj', 'parent_id' => 29],
//            ['name' => 'Matcha pribor', 'parent_id' => 29],
//            ['name' => 'Mate pribor', 'parent_id' => 39],
//            ['name' => 'Infuzeri i dodaci za pripremu čaja', 'parent_id' => 29],
//            ['name' => 'Matcha set', 'parent_id' => 21],
//        ]);

        $categories = collect([
            ['name' => 'Crni čaj', 'parent_id' => null], //1
            ['name' => 'Pu erh', 'parent_id' => null],
            ['name' => 'Oolong čaj', 'parent_id' => null],
            ['name' => 'Beli čaj', 'parent_id' => null],
            ['name' => 'Zeleni čaj', 'parent_id' => null],
            ['name' => 'Artisan', 'parent_id' => null], //6
            ['name' => 'Matcha', 'parent_id' => null],
            ['name' => 'Voćne mešavine', 'parent_id' => null],
            ['name' => 'Rooibos i biljni čajevi', 'parent_id' => null],
            ['name' => 'Mate', 'parent_id' => null],
            ['name' => 'Ayurvedic čajevi', 'parent_id' => null],
            ['name' => 'Organski čajevi', 'parent_id' => null], //12
            ['name' => 'Pribor', 'parent_id' => null],
            ['name' => 'Med', 'parent_id' => null],
            ['name' => 'Korporativni pokloni', 'parent_id' => null], //15

            ['name' => 'Matcha čaj', 'parent_id' => 7],

            ['name' => 'Matcha čaj', 'parent_id' => 7],
            ['name' => 'Matcha pribor', 'parent_id' => 7],
            ['name' => 'Matcha set', 'parent_id' => 7],

            ['name' => 'Mate čaj', 'parent_id' => 10],
            ['name' => 'Mate pribor', 'parent_id' => 10],
            ['name' => 'Mate set', 'parent_id' => 10],

            ['name' => 'Šolje i čajnici', 'parent_id' => 13],
            ['name' => 'Setovi za čaj', 'parent_id' => 13],
            ['name' => 'Kutije za čaj', 'parent_id' => 13],
            ['name' => 'Specijalni dodaci', 'parent_id' => 13],
            ['name' => 'Knjige', 'parent_id' => 13],
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
