<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class PostCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = collect([
            'Sve o čajevima',
            'Lifestyle',
            'Recepti',
            'Zdravlje',
        ]);

        $categories->each(function ($category) {
            PostCategory::factory()
                ->count(1)
                ->state(new Sequence(
                    ['name' => $category]
                ))
                ->create();
        });
    }
}
