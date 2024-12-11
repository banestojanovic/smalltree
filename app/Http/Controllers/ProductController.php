<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Models\Product;
use Spatie\LaravelData\PaginatedDataCollection;

class ProductController extends Controller
{
    public function index(): \Inertia\Response|\Inertia\ResponseFactory
    {
        return inertia('product/index', [
            'products' => ProductData::collect(Product::with('variations', 'discount', 'cover', 'categories')
                ->when(! empty(request('selectedCategory')), function ($query) {
                    $query->whereHas('categories', function ($q) {
                        $q->whereIn('categories.id', request('selectedCategory'));
                    });
                })
                ->paginate(12)),
            'query' => [
                'selectedCategory' => request('selectedCategory') ?? [],
            ],
        ]);
    }
}
