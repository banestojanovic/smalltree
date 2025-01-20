<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Models\Product;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = ProductData::from(Product::query()
            ->with(['variations.discount', 'photos', 'discount', 'cover', 'categories', 'attributes.attribute'])
            ->active()
            ->where('slug', $slug)
            ->firstOrFail()
        );

        $categoryIds = $product->categories?->pluck('id')->toArray();

        $similarProducts = ProductData::collect(Product::query()
            ->with(['variations.discount', 'discount', 'cover', 'categories'])
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->active()
            ->whereHas('categories', function ($q) use ($categoryIds) {
                $q->whereIn('categories.id', $categoryIds);
            })
            ->take(4)
            ->latest()
            ->get()
        );

        return inertia('product/show', [
            'product' => $product,
            'similarProducts' => $similarProducts,
        ]);
    }

    public function search()
    {
        $query = request('query');

        $products = Product::where('name', 'like', '%'.$query.'%')
            ->with('cover', 'discount')
            ->take(10)
            ->get();

        return response()->json(ProductData::collect($products));
    }
}
