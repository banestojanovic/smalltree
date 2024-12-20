<?php

namespace App\Http\Controllers;

use App\Data\CategoryData;
use App\Data\ProductData;
use App\Data\ProductVariationData;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariation;
use App\ProductStatus;

class CategoryController extends Controller
{
    public function show($slug): \Inertia\Response|\Inertia\ResponseFactory
    {
        $category = CategoryData::from(Category::where('slug', $slug)->firstOrFail());

        $promotionProduct = ProductData::from(Product::query()->active()->inRandomOrder()->first());

        $selectedVariation = request('selectedVariation') ?? '';

        $products = ProductData::collect(
            Product::query()
                ->with(['variations', 'discount', 'cover', 'categories'])
                ->active()
                ->whereHas('categories', fn($query) => $query->where('categories.id', $category->id))
                ->when($selectedVariation, function ($query, $selectedVariation) {
                    $query->whereHas('variations', function ($q) use ($selectedVariation) {
                        $q->where('product_variations.id', $selectedVariation);
                    });
                })
                ->paginate(12)
        );

        $variations = ProductVariationData::collect(
            ProductVariation::whereHas('product.categories', function ($query) use ($category) {
                $query->where('categories.id', $category->id);
            })->get()
        );

        return inertia('category/show', [
            'category' => $category,
            'products' => $products,
            'variations' => $variations,
            'promotionProduct' => $promotionProduct,
            'query' => [
                'selectedVariation' => $selectedVariation,
            ],
        ]);
    }
}
