<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Product;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'content' => $this->faker->paragraphs(3, true),
        ];
    }

    public function gallery()
    {
        return $this->afterCreating(function (Post $post) {
            for ($i = 1; $i <= 10; $i++) {
                $img = rand(1, 10);

                $post->addMediaFromDisk("products/$img.jpg", 'dummy')
                    ->preservingOriginal()
                    ->withProperties(['uuid' => Str::uuid()])
                    ->setOrder($i)
                    ->toMediaCollection(Disk::PostImages, Disk::PostImages);
            }
        });
    }
}
