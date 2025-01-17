<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

Route::get('/api/pretraga', [\App\Http\Controllers\ProductController::class, 'search'])->name('products.search');
Route::get('/pretraga', [\App\Http\Controllers\ProductController::class, 'searchPage'])->name('products.search-page');
Route::get('/cajevi', [\App\Http\Controllers\ProductController::class, 'searchPage'])->name('search.teas');
Route::get('/dodaci', [\App\Http\Controllers\ProductController::class, 'searchPage'])->name('search.sets');
Route::get('/proizvod/{slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
Route::get('/kategorije/{slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');

Route::get('/korpa', [\App\Http\Controllers\CartController::class, 'open'])->name('cart.open');
Route::post('/korpa/update', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
Route::put('/kopra/update-quantity', [\App\Http\Controllers\CartController::class, 'updateQuantity'])->name('cart.update');
Route::delete('/korpa/remove-product', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');

Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'show'])->name('checkout.show');

Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{uuid}', [\App\Http\Controllers\OrderController::class, 'summary'])->name('orders.summary');

Route::get('/blog', [\App\Http\Controllers\PostController::class, 'index'])->name('posts.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');

Route::post('/subscribers', [\App\Http\Controllers\SubscriberController::class, 'store'])->name('subscribers.store');

Route::get('/kontakt', [\App\Http\Controllers\ContactUsController::class, 'show'])->name('contact.show');
Route::post('/kontakt', [\App\Http\Controllers\ContactUsController::class, 'store'])->name('contact.store');

Route::get('/{slug}', [\App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
