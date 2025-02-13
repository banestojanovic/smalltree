<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Models\Product;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = ProductData::from(Product::query()
            ->with(['variations.discount', 'photos', 'discount', 'cover', 'categories', 'productTags', 'attributes.attribute'])
            ->active()
            ->where('slug', $slug)
            ->firstOrFail()
        );

        $categoryIds = $product->categories?->pluck('id')->toArray();

        $similarProducts = ProductData::collect(Product::query()
            ->whereNot('id', $product->id)
            ->with(['variations.discount', 'discount', 'cover', 'categories'])
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->active()
            ->whereHas('categories', function ($q) use ($categoryIds) {
                if (count($categoryIds) > 1) {
                    $categoryIds = array_slice($categoryIds, -1, 1);
                }
                $q->whereIn('categories.id', $categoryIds);
            })
            ->take(4)
            ->inRandomOrder()
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
