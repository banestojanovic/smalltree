<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Models\Product;
use App\Settings\GeneralSettings;
use App\Settings\PromotionSettings;
use App\Support\Disk;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function __invoke(GeneralSettings $settings, PromotionSettings $promotion_settings)
    {
        $actionProducts = $promotion_settings->action_products;
        $promotedProducts = $promotion_settings->promoted_products;
        $promotedSets = $promotion_settings->promoted_product_sets;

        $popularProducts = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories', 'productTags')
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->active()
            ->orderByDiscount()
            ->when(! empty($actionProducts), fn ($q) => $q->orderByRaw('FIELD(id, '.implode(',', $actionProducts).') DESC'))
            ->when(empty($actionProducts), fn ($q) => $q->inRandomOrder())
            ->limit(8)
            ->get());

        $staffRecommendedProducts = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories', 'productTags')
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->active()
            ->orderByTag()
            ->when(! empty($promotedProducts), fn ($q) => $q->orderByRaw('FIELD(id, '.implode(',', $promotedProducts).') DESC'))
            ->when(empty($promotedProducts), fn ($q) => $q->inRandomOrder())
            ->limit(8)
            ->get());

        $teaSets = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories', 'productTags')
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->where('product_type_id', 2)
            ->active()
            ->when(! empty($promotedSets), fn ($q) => $q->orderByRaw('FIELD(id, '.implode(',', $promotedSets).') DESC'))
            ->when(empty($promotedSets), fn ($q) => $q->inRandomOrder())
            ->limit(4)
            ->get());

        
        $teaOfTheMonth = [
            'title' => $promotion_settings->tea_of_the_month_title['sr'] ?? '',
            'subtitle' => $promotion_settings->tea_of_the_month_subtitle['sr'] ?? '',
            'image' => ! empty($promotion_settings->tea_of_the_month_bg_image) ? Storage::disk(Disk::Attachments)->url($promotion_settings->tea_of_the_month_bg_image[0]) : asset('storage/site/images/hero_art.webp'),
            'products' => ProductData::collect(Product::with('cover', 'categories')
                ->active()
                ->when(! empty($promotion_settings->tea_of_the_month_products),
                    fn ($q) => $q->whereIn('id', $promotion_settings->tea_of_the_month_products))
                ->inRandomOrder()
                ->limit(3)
                ->get()),
        ];

        $specialOffer = [
            'title' => $promotion_settings->special_offer_title['sr'] ?? '',
            'subtitle' => $promotion_settings->special_offer_subtitle['sr'] ?? '',
            'image' => ! empty($promotion_settings->special_offer_bg_image) ? Storage::disk(Disk::Attachments)->url($promotion_settings->special_offer_bg_image[0]) : asset('storage/site/images/hero_art.webp'),
            'products' => ProductData::collect(Product::with('cover', 'categories')
                ->active()
                ->when(! empty($promotion_settings->special_offer_products),
                    fn ($q) => $q->whereIn('id', $promotion_settings->special_offer_products))
                ->inRandomOrder()
                ->limit(3)
                ->get()),
        ];

        return inertia('home/index', [
            'popularProducts' => $popularProducts,
            'staffRecommendedProducts' => $staffRecommendedProducts,
            'teaSets' => $teaSets,
            'productOfTheMonth' => $teaOfTheMonth,
            'specialOffer' => $specialOffer,
            'hero' => [
                'title' => $settings->hero_title['sr'] ?? '',
                'subtitle' => $settings->hero_subtitle['sr'] ?? '',
                'image' => ! empty($settings->hero_image) ? Storage::disk(Disk::Attachments)->url($settings->hero_image[0]) : asset('storage/site/images/hero.jpg'),
            ],
        ]);
    }
}
