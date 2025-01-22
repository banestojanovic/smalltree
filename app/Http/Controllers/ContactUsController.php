<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactUsController extends Controller
{
    public function show()
    {
        return inertia('contact/show');
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required',
            'message' => 'required|min:10',
        ]);

        if ($validation->fails()) {
            return back()->with(['error' => $validation->errors()->first()])->withErrors($validation->errors());
        }

        return redirect()->back()->with('success', __('contact')['message_received']);
    }
}
