<?php

use Illuminate\Support\Facades\Route;

Route::get('/pretraga', [\App\Http\Controllers\ProductController::class, 'search'])->name('products.search');
