<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Models\Product;

class HomeController extends Controller
{
    public function __invoke()
    {
        return inertia('home', [
            'products' => ProductData::collect(Product::with('variations', 'discount', 'cover')->limit(12)->get()),
        ]);
    }
}
