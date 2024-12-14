<?php

namespace App\Http\Controllers;

use App\Data\PostData;
use App\Data\ProductData;
use App\Models\Post;
use App\Models\Product;
use App\PostStatus;
use App\ProductStatus;

class HomeController extends Controller
{
    public function __invoke()
    {
        $popularProducts = ProductData::collect(Product::query()
            ->with('variations', 'discount', 'cover', 'categories')
            ->where('status', ProductStatus::ACTIVE)
            ->limit(8)
            ->get());

        $staffRecommendedProducts = ProductData::collect(Product::query()
            ->with('variations', 'discount', 'cover', 'categories')
            ->where('status', ProductStatus::ACTIVE)
            ->skip(8)
            ->limit(8)
            ->get());

        $blogs = PostData::collect(Post::query()
            ->with('cover', 'categories')
            ->where('status', PostStatus::ACTIVE)
            ->take(3)
            ->get());

        return inertia('home/index', [
            'popularProducts' => $popularProducts,
            'staffRecommendedProducts' => $staffRecommendedProducts,
            'blogs' => $blogs,
        ]);
    }
}
