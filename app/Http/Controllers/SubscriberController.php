<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use App\SubscriberStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|string|lowercase|email|max:255|unique:' . Subscriber::class,
        ]);

        if ($validation->fails()) {
            return back()->with(['error' => $validation->errors()->first()]);
        }

        Subscriber::create([
            'email' => $request->email,
            'status' => SubscriberStatus::ACTIVE,
        ]);

        return redirect()->back()->with('success', __('subscription')['you_are_subscribed']);
    }
}
