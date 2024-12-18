<?php

use Illuminate\Support\Facades\Route;

/* Homepage */
Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

/* Products */
Route::get('/products/{slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
Route::get('/categories/{slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');

/* Cart */
Route::post('/cart/update', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
Route::put('/cart/update-quantity', [\App\Http\Controllers\CartController::class, 'updateQuantity'])->name('cart.update');
Route::delete('/cart/remove-product', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');

/* Checkout */
Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'show'])->name('checkout.show');

/* Checkout */
Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
