<?php

namespace App\Http\Controllers;

use App\AttributeSearchable;
use App\Data\AttributeData;
use App\Data\ProductData;
use App\Data\ProductTypeData;
use App\Data\VariationData;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Variation;
use App\VariationSearchable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class SearchController extends Controller
{
    public function search(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $selectedAttributesValues = request('attributes') ?? [];
        $selectedVariationValues = request('variations') ?? [];

        $selectedTypes = request('selectedTypes') ?? [];
        if (! empty(request('type'))) {
            $types = [request('type')];
            if (request('type') === 'dodaci') {
                $types = ['pribor', 'med'];
            }
            $types = ProductType::whereIn('slug', $types)->pluck('id')->toArray();
            $selectedTypes = array_map('strval', $types) ?? null;
        }
        $products = ProductData::collect(
            Product::with(['variations', 'discount', 'cover', 'categories'])
                ->active()
                ->when(! empty($selectedTypes), fn ($query) => $query->whereIn('product_type_id', $selectedTypes))
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
                ->when(request('search') ?? null, function ($query, $search) {
                    $query->where('name', 'like', "%$search%");
                })
                ->when(! empty(request('selectedCategories')), function ($query) {
                    $query->whereHas('categories', function ($q) {
                        $q->whereIn('categories.id', request('selectedCategories'));
                    });
                })
                ->orderByDiscount()
                ->paginate(16)
        );

        $variations = VariationData::collect(Variation::where('searchable', VariationSearchable::YES)->with('values')->get());
        $attributes = AttributeData::collect(Attribute::where('searchable', AttributeSearchable::YES)->with('values')->get());

        $title = __('search.title');
        $description = __('search.description');

        if (! empty(request('slug'))) {
            $category = Category::where('slug', request('slug'))->first();
            if ($category) {
                $title = $category->name;
                $description = $category->description;
            }
        }

        if (request('type') === 'cajevi') {
            $title = 'Čajevi';
            $description = 'Otkrijte pravu aromu čajeva iz naše ponude. Uživajte u različitim ukusima i mirisima.';
        }

        if (request('type') === 'dodaci') {
            $title = 'Pribor i med';
            $description = 'Opremite se za uživanje u čaju uz naš pribor i med. Pronađite savršen poklon za sebe ili nekog koga volite.';
        }

        return inertia('product/search', [
            'pageData' => [
                'title' => $title,
                'description' => $description,
                'slug' => request('slug') ?? '',
            ],
            'products' => $products,
            'variations' => $variations,
            'attributes' => $attributes,
            'types' => ProductTypeData::collect(ProductType::get()),
            'query' => [
                'selectedTypes' => $selectedTypes ?? [],
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
