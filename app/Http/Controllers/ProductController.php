<?php

namespace App\Http\Controllers;

use App\Data\AttributeData;
use App\Data\ProductData;
use App\Data\VariationData;
use App\Models\Attribute;
use App\Models\Product;
use App\Models\Variation;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = ProductData::from(Product::query()
            ->with(['variations', 'photos', 'discount', 'cover', 'categories', 'attributes.attribute'])
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

    public function search()
    {
        $query = request('query');

        $products = Product::where('name', 'like', '%'.$query.'%')
            ->with('cover')
            ->take(20)
            ->get();

        return response()->json(ProductData::collect($products));
    }

    public function searchPage(): \Inertia\Response|\Inertia\ResponseFactory
    {
//        dd(request()->all());

        $selectedAttributesValues = request('attributes') ?? [];
        $selectedVariationValues = request('variations') ?? [];

        $products = ProductData::collect(
            Product::with(['variations', 'discount', 'cover', 'categories'])
                ->active()
                ->when($selectedAttributesValues && count($selectedAttributesValues) > 0, function ($query) use ($selectedAttributesValues) {
                    foreach ($selectedAttributesValues as $attribute => $value) {
                        if (! empty($value)) {
                            $query->whereHas('attributes', function ($q) use ($value) {
                                $q->whereIn('attribute_values.id', (array) $value);
                            });
                        }
                    }
                })
                ->when($selectedVariationValues && count($selectedVariationValues) > 0, function ($query) use ($selectedVariationValues) {
                    foreach ($selectedVariationValues as $variationId => $variationValue) {
                        if (! empty($variationValue)) {
                            $query->whereHas('variations', function ($q) use ($variationValue) {
                                $q->whereHas('variations', function ($q2) use ($variationValue) {
                                    $q2->whereIn('variation_values.id', (array) $variationValue);
                                });
                            });
                        }
                    }
                })
                ->when(request()->filled('priceRange') && count(request('priceRange')) === 2, function ($query) {
                    $query->whereHas('variations', function ($q) {
                        $priceRange = request('priceRange');
                        $q->where('price', '>=', $priceRange[0] * 100)
                            ->where('price', '<=', $priceRange[1] * 100);
                    });

                })
                ->when(request('search') ?? null, function ($query, $search) {
                    $query->where('name', 'like', "%$search%");
                })
                ->when(! empty(request('selectedCategories')), function ($query) {
                    $query->whereHas('categories', function ($q) {
                        $q->whereIn('categories.id', request('selectedCategories'));
                    });
                })
                ->paginate(30)
        );

        $variations = VariationData::collect(Variation::with('values')->get());
        $attributes = AttributeData::collect(Attribute::with('values')->get());

        return inertia('product/search', [
            'products' => $products,
            'variations' => $variations,
            'attributes' => $attributes,
            'query' => [
                'variations' => $variations->mapWithKeys(fn ($variation) => [
                    $variation->id => request('variations')[$variation->id] ?? null,
                ]),
                'attributes' => $attributes->mapWithKeys(fn ($attribute) => [
                    $attribute->slug => request('attributes')[$attribute->slug] ?? null,
                ]),
                'priceRange' => request('priceRange'),
                'search' => request('search'),
                'selectedCategories' => request('selectedCategories') ?? [],
            ],
        ]);
    }
}
