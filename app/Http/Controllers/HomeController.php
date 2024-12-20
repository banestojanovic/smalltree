<?php

namespace App\Http\Controllers;

use App\Data\PostData;
use App\Data\ProductData;
use App\Models\Post;
use App\Models\Product;
use App\Models\Variation;
use App\PostStatus;

class HomeController extends Controller
{
    public function __invoke()
    {
        $variations = Variation::all();

        $popularProducts = ProductData::collect(Product::query()
            ->with('discount', 'cover', 'categories')
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
            ->with('variations', 'discount', 'cover', 'categories')
            ->active()
            ->skip(8)
            ->limit(8)
            ->get());

        $posts = PostData::collect(Post::query()
            ->with('cover', 'categories')
            ->where('status', PostStatus::ACTIVE)
            ->take(3)
            ->get());

        return inertia('home/index', [
            'popularProducts' => $popularProducts,
            'staffRecommendedProducts' => $staffRecommendedProducts,
            'posts' => $posts,
        ]);
    }
}
