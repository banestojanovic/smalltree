<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function dismiss()
    {
        session()->put('notification.dismissed', true);

        return back();
    }
}
