<?php

namespace App\Http\Controllers;

use App\Data\PostData;
use App\Data\ProductData;
use App\Models\Post;
use App\Models\Product;
use App\Models\Variation;

class HomeController extends Controller
{
    public function __invoke()
    {
        $variations = Variation::all();

        $popularProducts = ProductData::collect(Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories')
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->active()
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
        ]);
    }


}
