<?php

use Illuminate\Support\Facades\Route;

Route::get('/pretraga', [\App\Http\Controllers\ProductController::class, 'search'])->name('products.search');

Route::post('/placanje-uspesno', [\App\Http\Controllers\PaymentStatusController::class, 'success'])->name('nestpay.success');
Route::post('/placanje-greska', [\App\Http\Controllers\PaymentStatusController::class, 'fail'])->name('nestpay.fail');
