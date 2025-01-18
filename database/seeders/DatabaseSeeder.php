<?php

namespace Database\Seeders;

use App\Imports\ContentImport;
use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Settings\GeneralSettings;
use App\Settings\PromotionSettings;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
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
        Storage::disk('public')->deleteDirectory('attachments');

        User::factory()->superAdmin()->create([
            'email' => 'admin@test.com',
        ]);

        (new CategorySeeder)->run();

        ProductType::factory()->count(3)
            ->state(new Sequence(fn ($sequence) => ['name' => 'Čaj'],
                ['name' => 'Pribor'],
                ['name' => 'Med'],
            ))
            ->create();

        (new AttributeSeeder)->run();
        //        (new AttributeValueSeeder)->run();
        (new VariationSeeder)->run();
        (new VariationValueSeeder)->run();

        (new PostCategorySeeder)->run();
        $posts = Post::factory()->count(50)->gallery()->create();

        $posts->each(function ($post) {
            $post->categories()->attach(PostCategory::inRandomOrder()->first()->id);
            $post->attachTags(Tag::inRandomOrder()->limit(3)->get()->pluck('name')->toArray());
        });

        Excel::import(new ContentImport, storage_path('app/public/import/content.xlsx'));

        if (app()->environment('local', 'staging')) {
            $promoted = Product::inRandomOrder()->limit(3)->get();
            $promoted->each(function ($product) {
                Discount::create([
                    'product_id' => $product->id,
                    'price' => $product->price * 0.8,
                    'starts_at' => now()->subDays(rand(1, 10)),
                    'ends_at' => now()->addDays(rand(10, 30)),
                ]);
            });
        }

        $this->seedSettings();

        return;

        // just for testing.

        Product::factory()->count(50)->gallery()->create();

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

        (new PostCategorySeeder)->run();
        $posts = Post::factory()->count(50)->gallery()->create();

        $posts->each(function ($post) {
            $post->categories()->attach(Category::inRandomOrder()->first()->id);
            $post->attachTags(Tag::inRandomOrder()->limit(3)->get()->pluck('name')->toArray());
        });
    }

    public function seedSettings()
    {
        $settings = (new GeneralSettings);
        $promotionSettings = (new PromotionSettings);

        $heroImg = $this->copyAttachment('hero.webp');
        $settings->hero_image = [$heroImg];

        $teaOfTheMonthImg = $this->copyAttachment('hero_art.webp');
        $promotionSettings->tea_of_the_month_bg_image = [$teaOfTheMonthImg];
        $promotionSettings->tea_of_the_month_products = [Product::whereHas('discount')->inRandomOrder()->first()->id];

        $specialOfferImg = $this->copyAttachment('special_offer.webp');
        $promotionSettings->special_offer_bg_image = [$specialOfferImg];
        $promotionSettings->special_offer_products = [Product::inRandomOrder()->first()->id];

        $promotedPackages = [
            [
                'bg_image' => [$this->copyAttachment('special_offer.webp')],
                'title' => ['sr' => 'Vaš MATE čaj ritual'],
                'subtitle' => ['sr' => 'Komplet set za pripremanje mate čaja'],
                'products' => [Product::where('product_type_id', 1)->inRandomOrder()->first()->id, Product::where('product_type_id', 1)->inRandomOrder()->first()->id],
            ],
            [
                'bg_image' => [$this->copyAttachment('hero_art.webp')],
                'title' => ['sr' => 'Vaš MATCHA čaj ritual'],
                'subtitle' => ['sr' => 'Komplet set za pripremanje matcha čaja'],
                'products' => [Product::where('product_type_id', 1)->inRandomOrder()->first()->id, Product::where('product_type_id', 1)->inRandomOrder()->first()->id],
            ],
        ];

        $promotionSettings->promo_packages = $promotedPackages;

        $settings->save();
        $promotionSettings->save();
    }

    public function copyAttachment(string $sourceImg)
    {
        $sourcePath = "site/images/$sourceImg";

        $name = rand(10000000, 99999999).'.webp';
        if (Storage::disk('public')->exists($sourcePath)) {
            Storage::disk(Disk::Attachments)->put(
                $name,
                Storage::disk('public')->get($sourcePath)
            );
        }

        return $name;
    }
}
