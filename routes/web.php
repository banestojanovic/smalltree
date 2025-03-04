<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

Route::get('/pretraga', [\App\Http\Controllers\SearchController::class, 'search'])->name('search.show');
Route::get('/proizvod/{slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
Route::get('/kategorija/{category?}', [\App\Http\Controllers\SearchController::class, 'search'])->name('categories.show');

Route::get('/korpa', [\App\Http\Controllers\CartController::class, 'open'])->name('cart.open');
Route::post('/korpa/update', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
Route::post('/korpa/update-grouped', [\App\Http\Controllers\CartController::class, 'storeGrouped'])->name('cart.store_grouped');
Route::put('/kopra/update-quantity', [\App\Http\Controllers\CartController::class, 'updateQuantity'])->name('cart.update');
Route::delete('/korpa/remove-product', [\App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');

Route::post('/kupi-odmah', \App\Http\Controllers\BuyNowController::class)->name('buy_now');

Route::get('/placanje', [\App\Http\Controllers\CheckoutController::class, 'show'])->name('checkout.show');

Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{uuid}', [\App\Http\Controllers\OrderController::class, 'summary'])->name('orders.summary');

Route::get('/blog', [\App\Http\Controllers\PostController::class, 'index'])->name('posts.index');
Route::get('/blog/{category}', [\App\Http\Controllers\PostController::class, 'index'])->name('posts_by_category.index');
Route::get('/clanak/{slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');

Route::post('/subscribers', [\App\Http\Controllers\SubscriberController::class, 'store'])->name('subscribers.store');

Route::get('/kontakt', [\App\Http\Controllers\ContactUsController::class, 'show'])->name('contact.show');
Route::post('/kontakt', [\App\Http\Controllers\ContactUsController::class, 'store'])->name('contact.store');

Route::get('/o-nama', [\App\Http\Controllers\PageController::class, 'aboutUs'])->name('page.about.show');
Route::get('/uslovi-koriscenja', [\App\Http\Controllers\PageController::class, 'terms'])->name('page.terms.show');
Route::get('/politika-privatnosti', [\App\Http\Controllers\PageController::class, 'privacyPolicy'])->name('page.privacy_policy.show');

Route::get('/placanje-neuspesno/{payment}', [\App\Http\Controllers\PaymentStatusController::class, 'paymentFailed'])->name('payment_failed.show');

Route::get('/{type}', [\App\Http\Controllers\SearchController::class, 'search'])
    ->where('type', 'cajevi|pribor|dodaci|ostalo')
    ->name('search.type');

if (Schema::hasTable('pages')) {
    \App\Models\Page::all()->each(function ($page) {
        Route::get($page->slug, [\App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
    });
}
