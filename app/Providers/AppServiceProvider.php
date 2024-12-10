<?php

namespace App\Providers;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\User;
use App\Models\Variation;
use App\Models\VariationValue;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Foundation\Console\CliDumper;
use Illuminate\Foundation\Http\HtmlDumper;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        HtmlDumper::dontIncludeSource();
        CliDumper::dontIncludeSource();
        Validator::excludeUnvalidatedArrayKeys();
        Model::shouldBeStrict();
        Model::unguard();
        Relation::enforceMorphMap([
            'user' => User::class,
            'product' => Product::class,
            'product_variation' => ProductVariation::class,
            'category' => Category::class,
            'attribute' => Attribute::class,
            'attribute_value' => AttributeValue::class,
            'variation' => Variation::class,
            'variation_value' => VariationValue::class,
            'order' => Order::class,
            'cart' => Cart::class,
        ]);
        Date::use(CarbonImmutable::class);
    }
}
