<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductVariationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();

        $products->each(function (Product $product) {
            // 50g
            $variation = $product->variations()->create([
                'sku' => $product->sku,
                'price' => $product->price / 2,
                'stock' => $product->stock,
            ]);

            $variation->variations()->attach(1);

            // 100g
            $variation = $product->variations()->create([
                'sku' => $product->sku,
                'price' => $product->price,
                'stock' => $product->stock,
            ]);

            $variation->variations()->attach(2);

            // 250g
            $variation = $product->variations()->create([
                'sku' => $product->sku,
                'price' => $product->price * 2.5,
                'stock' => $product->stock,
            ]);

            $variation->variations()->attach(3);
        });
    }
}
