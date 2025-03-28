<?php

namespace App\Http\Controllers;

use App\AttributeSearchable;
use App\AttributeType;
use App\Data\AttributeData;
use App\Data\ProductData;
use App\Data\ProductTypeData;
use App\Data\VariationData;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Variation;
use App\Settings\PromotionSettings;
use App\VariationSearchable;

class SearchController extends Controller
{
    public function search(PromotionSettings $promotion_settings): \Inertia\Response|\Inertia\ResponseFactory
    {
        $selectedAttributesValues = request('attributes') ?? [];
        $selectedVariationValues = request('variations') ?? [];
        $contains = request('contains') ?? [];

        $selectedTypes = request('selectedTypes') ?? [];
        if (! empty(request('type'))) {
            $types = [request('type')];
            if (request('type') === 'dodaci') {
                $types = ['pribor', 'med'];
            }
            $types = ProductType::whereIn('slug', $types)->pluck('id')->toArray();
            $selectedTypes = array_map('strval', $types) ?? null;
        }

        $ids = [];
        if (! empty(request('custom'))) {
            if (request('custom') === 'novo') {
                $ids = $promotion_settings->new_products;
            }
            if (request('custom') === 'smalltree-preporuka') {
                $ids = $promotion_settings->tea_of_the_month_products;
            }
            if (request('custom') === 'najpopularniji') {
                $ids = $promotion_settings->special_offer_products;
            }
        }

        $selectedCategories = request('selectedCategories') ?? [];

        if (! empty(request('category'))) {
            $category = Category::where('slug', request('category'))->first();
            if ($category) {
                $selectedCategories = array_merge($selectedCategories, [$category->id]);
            }
        }

        $products = ProductData::collect(
            Product::with(['variations', 'variations.discount', 'discount', 'cover', 'categories', 'productTags'])
                ->active()
                ->when(! empty($ids), fn ($query) => $query->whereIn('id', $ids))
                ->when(! empty($selectedTypes), fn ($query) => $query->whereIn('product_type_id', $selectedTypes))
                ->when($contains && count($contains) > 0, function ($query) use ($contains) {
                    foreach ($contains as $attribute => $value) {
                        if (! empty($value)) {
                            $query->whereHas('attributes', function ($q) use ($value) {
                                $q->whereIn('attribute_values.id', (array) $value);
                            });
                        }
                    }
                })
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
                ->when(! empty($selectedCategories), function ($query) use ($selectedCategories) {
                    $query->whereHas('categories', fn ($q) => $q->whereIn('categories.id', $selectedCategories));
                })
                ->orderByDiscount()
                ->orderBy('order_column')
                ->when((request('custom') === 'na-akciji'), fn ($query) => $query->has('discount'))
                ->paginate(16)
        );

        $variations = VariationData::collect(Variation::where('searchable', VariationSearchable::YES)->with('values')->get());
        $attributes = AttributeData::collect(Attribute::where('searchable', AttributeSearchable::YES)->where('type', AttributeType::SELECT)->with('values')->get());
        $radioAttributes = AttributeData::collect(Attribute::where('searchable', AttributeSearchable::YES)->where('type', AttributeType::RADIO)
            ->with([
                'values' => function ($query) {
                    $query->where('value->sr', 'Nema');
                },
            ])
            ->get());

        $title = __('search.title');
        $description = __('search.description');

        if (! empty(request('category'))) {
            $category = Category::where('slug', request('category'))->first();
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
                'slug' => request('category') ?? request('slug') ?? '',
                'isCategory' => (bool) request('category'),
                'isNew' => request('custom') === 'novo',
            ],
            'products' => $products,
            'variations' => $variations,
            'attributes' => $attributes,
            'radioAttributes' => $radioAttributes,
            'types' => ProductTypeData::collect(ProductType::get()),
            'query' => [
                'selectedTypes' => $selectedTypes ?? [],
                'attributes' => $attributes->mapWithKeys(fn ($attribute) => [
                    $attribute->slug => request('attributes')[$attribute->slug] ?? null,
                ]),
                'contains' => $radioAttributes->mapWithKeys(fn ($attribute) => [
                    $attribute->slug => request('contains')[$attribute->slug] ?? null,
                ]),
                'variations' => $variations->mapWithKeys(fn ($variation) => [
                    $variation->id => request('variations')[$variation->id] ?? null,
                ]),
                'priceRange' => request('priceRange'),
                'search' => request('search'),
                'selectedCategories' => request('selectedCategories') ?? [],
            ],
        ]);
    }
}
