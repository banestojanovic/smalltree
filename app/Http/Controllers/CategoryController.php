<?php

namespace App\Http\Controllers;

use App\Data\AttributeData;
use App\Data\CategoryData;
use App\Data\ProductData;
use App\Data\VariationData;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Product;
use App\Models\Variation;

class CategoryController extends Controller
{
    public function show($slug): \Inertia\Response|\Inertia\ResponseFactory
    {
        $category = CategoryData::from(Category::where('slug', $slug)->firstOrFail());

        $promotionProduct = ProductData::from(Product::with('cover')->active()->inRandomOrder()->first());

        $selectedAttributesValues = request('attributes') ?? [];
        $selectedVariationValues = request('variations') ?? [];

        $products = ProductData::collect(
            Product::with(['variations', 'discount', 'cover', 'categories'])
                ->active()
                ->whereHas('categories', fn ($query) => $query->where('categories.id', $category->id))
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
                    $priceRange = request('priceRange');
                    $query->whereBetween('base_price', [$priceRange[0] * 100, $priceRange[1] * 100]);
                })
                ->paginate(12)
        );

        $variations = VariationData::collect(Variation::with('values')->get());
        $attributes = AttributeData::collect(Attribute::with('values')->get());

        return inertia('category/show', [
            'category' => $category,
            'products' => $products,
            'variations' => $variations,
            'attributes' => $attributes,
            'promotionProduct' => $promotionProduct,
            'query' => [
                'variations' => $variations->mapWithKeys(fn ($variation) => [
                    $variation->id => request('variations')[$variation->id] ?? null,
                ]),
                'attributes' => $attributes->mapWithKeys(fn ($attribute) => [
                    $attribute->slug => request('attributes')[$attribute->slug] ?? null,
                ]),
                'priceRange' => request('priceRange'),
            ],
        ]);
    }
}
