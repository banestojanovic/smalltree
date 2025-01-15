<?php

namespace Database\Factories;

use App\Models\Category;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word,
            'description' => $this->faker->sentence,
        ];
    }

    public function cover()
    {
        return $this->afterCreating(function (Category $category) {

            if ($category->parent_id) {
                return;
            }

            $slug = $category->slug;

            $filePath = "dummy/server/categories/$slug.webp";

            $category->addMediaFromDisk($filePath, 'public')
                ->preservingOriginal()
                ->withProperties(['uuid' => Str::uuid()])
                ->setOrder(1)
                ->toMediaCollection(Disk::CategoryImages, Disk::CategoryImages);
        });
    }
}
