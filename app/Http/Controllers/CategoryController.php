<?php

namespace App\Http\Controllers;

use App\Data\CategoryData;
use App\Data\ProductData;
use App\Models\Category;
use App\Models\Product;
use App\ProductStatus;

class CategoryController extends Controller
{
    public function show($slug): \Inertia\Response|\Inertia\ResponseFactory
    {
        $category = CategoryData::from(Category::where('slug', $slug)->firstOrFail());

        $promotionProduct = ProductData::from(Product::query()->active()->inRandomOrder()->first());

        $products = ProductData::collect(
            Product::query()
                ->with(['variations', 'discount', 'cover', 'categories'])
                ->active()
                ->whereHas('categories', fn ($query) => $query->where('categories.id', $category->id))
                ->paginate(12)
        );

        return inertia('category/show', [
            'category' => $category,
            'products' => $products,
            'promotionProduct' => $promotionProduct,
        ]);
    }
}
