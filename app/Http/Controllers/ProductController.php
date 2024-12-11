<?php

namespace App\Http\Controllers;

use App\Data\CategoryData;
use App\Data\ProductData;
use App\Models\Category;
use App\Models\Product;

class ProductController extends Controller
{
//    public function __invoke()
//    {
//        return inertia('home', [
//            'products' => ProductData::collect(Product::with('variations', 'discount', 'cover')->limit(12)->get()),
//        ]);
//    }

    public function index()
    {
        $selectedCategory = request()->get('selectedCategory') ?? null;

        $products = CategoryData::collect(Category::query()
            ->with('products.cover')
            ->when($selectedCategory ?? null, fn($query, $categoryId) => $query->where('id', $categoryId))
            ->get()
        );

        return inertia('product/index', [
            'products' => $products,
        ]);
    }
}
