<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

Route::get('/products/{slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
Route::get('/categories/{slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');

Route::get('/cart/open', [\App\Http\Controllers\CartController::class, 'open'])->name('cart.open');
Route::post('/cart/update', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
Route::put('/cart/update-quantity', [\App\Http\Controllers\CartController::class, 'updateQuantity'])->name('cart.update');
Route::delete('/cart/remove-product', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');

Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'show'])->name('checkout.show');

Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{orderId}/summary', [\App\Http\Controllers\OrderController::class, 'summary'])->name('orders.summary');

Route::get('/stores', [\App\Http\Controllers\PostController::class, 'index'])->name('posts.index');
Route::get('/stores/{slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');
