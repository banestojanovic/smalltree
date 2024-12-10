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
            'sku' => $this->faker->numberBetween(1000, 10000),
            'price' => $this->faker->numberBetween(1000, 10000),
            'stock' => $this->faker->numberBetween(1, 100),
            'description' => $this->faker->text(),
        ];
    }

    public function gallery()
    {
        return $this->afterCreating(function (Product $product) {
            for ($i = 1; $i <= 10; $i++) {
                $img = rand(1, 10);

                $product->addMediaFromDisk("products/$img.jpg", 'dummy')
                    ->preservingOriginal()
                    ->withProperties(['uuid' => Str::uuid()])
                    ->setOrder($i)
                    ->toMediaCollection(Disk::ProductImages, Disk::ProductImages);
            }
        });
    }
}
