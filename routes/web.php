<?php
use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

Route::get('/products/{slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
Route::get('/categories/{slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');

Route::post('/cart/update', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
Route::put('/cart/update-quantity', [\App\Http\Controllers\CartController::class, 'updateQuantity'])->name('cart.update');
Route::delete('/cart/remove-product', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');
