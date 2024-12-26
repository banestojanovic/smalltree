<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Models\Product;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = ProductData::from(Product::query()
            ->with(['variations', 'photos',  'discount', 'cover', 'categories', 'attributes.attribute'])
            ->active()
            ->where('slug', $slug)
            ->firstOrFail()
        );

        $categoryIds = $product->categories?->pluck('id')->toArray();
        $similarProducts = ProductData::collect(Product::query()
            ->with(['discount', 'cover', 'categories'])
            ->active()
            ->whereHas('categories', function ($q) use ($categoryIds) {
                $q->whereIn('categories.id', $categoryIds);
            })
            ->take(22)
            ->latest()
            ->get()
        );

        return inertia('product/show', [
            'product' => $product,
            'similarProducts' => $similarProducts,
        ]);
    }
}
