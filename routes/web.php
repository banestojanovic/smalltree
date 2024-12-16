<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

Route::get('/categories/{slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');
Route::get('/products/{slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
