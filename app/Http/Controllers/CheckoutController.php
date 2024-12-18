<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class CheckoutController extends Controller
{
    public function show()
    {
        return inertia('checkout/show');
    }

}
