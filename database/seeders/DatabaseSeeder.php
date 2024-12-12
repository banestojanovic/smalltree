<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Post;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Spatie\Tags\Tag;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Storage::disk('public')->deleteDirectory('user');
        Storage::disk('public')->deleteDirectory('product');
        Storage::disk('public')->deleteDirectory('category');
        Storage::disk('public')->deleteDirectory('post');
        Storage::disk('public')->deleteDirectory('post_category');

        User::factory()->superAdmin()->create([
            'email' => 'admin@test.com',
        ]);

        //        User::factory()->create([
        //            'name' => 'Test User',
        //            'email' => 'test@example.com',
        //        ]);

        (new CategorySeeder)->run();

        Product::factory()->count(50)->gallery()->create();

        (new AttributeSeeder)->run();
        (new AttributeValueSeeder)->run();
        (new VariationSeeder)->run();
        (new VariationValueSeeder)->run();

        $products = Product::all();
        $products->each(function ($product) {
            $product->categories()->attach(Category::inRandomOrder()->first()->id);
            $product->attachTags(Tag::inRandomOrder()->limit(3)->get()->pluck('name')->toArray());

            $product->attributes()->sync([
                AttributeValue::where('attribute_id', 1)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 2)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 3)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 4)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 5)->inRandomOrder()->first()->id,
            ]);
        });

        (new ProductVariationSeeder)->run();

        Discount::factory()->count(4)->create();

        Post::factory()->count(50)->gallery()->create();
    }
}
