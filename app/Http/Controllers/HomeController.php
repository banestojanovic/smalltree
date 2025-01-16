<?php

namespace App\Http\Controllers;

use App\Data\PostData;
use App\Data\ProductData;
use App\Models\Discount;
use App\Models\Post;
use App\Models\Product;
use App\Models\Variation;
use App\Settings\GeneralSettings;
use App\Settings\PromotionSettings;
use App\Support\Disk;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function __invoke(GeneralSettings $settings, PromotionSettings $promotion_settings)
    {
        $promotedProducts = $promotion_settings->promoted_products;

        $popularProducts = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories')
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->active()
            ->orderByDiscount()
            ->when(! empty($promotedProducts), fn ($q) => $q->orderByRaw('FIELD(id, '.implode(',', $promotedProducts).') DESC'))
            ->limit(8)
            ->get());

        $staffRecommendedProducts = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories')
            ->active()
            ->skip(8)
            ->limit(8)
            ->get());

        $specialOffer = ProductData::from(Product::with('cover')->active()->inRandomOrder()->first());
        $productOfTheMonth = ProductData::from(Product::with('cover')->active()->inRandomOrder()->first());

        $posts = PostData::collect(Post::query()
            ->with('cover', 'categories')
            ->active()
            ->take(3)
            ->get());

        $matchRituals = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories')
            ->active()
            ->limit(2)
            ->get());

        $mateRituals = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories')
            ->active()
            ->skip(2)
            ->limit(2)
            ->get());

        return inertia('home/index', [
            'popularProducts' => $popularProducts,
            'staffRecommendedProducts' => $staffRecommendedProducts,
            'posts' => $posts,
            'specialOffer' => $specialOffer,
            'productOfTheMonth' => $productOfTheMonth,
            'matchRituals' => $matchRituals,
            'mateRituals' => $mateRituals,
            'hero' => [
                'title' => $settings->hero_title['sr'] ?? '',
                'subtitle' => $settings->hero_subtitle['sr'] ?? '',
                'image' => ! empty($settings->hero_image) ? Storage::disk(Disk::Attachments)->url($settings->hero_image[0]) : asset('site/images/hero.jpg'),
            ],
        ]);
    }


}
