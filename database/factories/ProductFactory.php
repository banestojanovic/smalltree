<?php

namespace Database\Factories;

use App\Models\Product;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(1000, 10000),
        ];
    }

    public function gallery()
    {
        return $this->afterCreating(function (Product $product) {
            for ($i = 1; $i <= 10; $i++) {
                $img = rand(1, 11);

                $product->addMediaFromDisk("cars/$img.jpg", 'dummy')
                    ->preservingOriginal()
                    ->withProperties(['uuid' => Str::uuid()])
                    ->setOrder($i)
                    ->toMediaCollection(Disk::ProductImages, Disk::ProductImages);
            }
        });
    }
}
