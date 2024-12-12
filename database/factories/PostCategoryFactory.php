<?php

namespace Database\Factories;

use App\Models\PostCategory;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PostCategory>
 */
class PostCategoryFactory extends Factory
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
        return $this->afterCreating(function (PostCategory $category) {

            $img = rand(1, 10);

            $category->addMediaFromDisk("products/$img.jpg", 'dummy')
                ->preservingOriginal()
                ->withProperties(['uuid' => Str::uuid()])
                ->setOrder(1)
                ->toMediaCollection(Disk::PostCategoryImages, Disk::PostCategoryImages);
        });
    }
}
