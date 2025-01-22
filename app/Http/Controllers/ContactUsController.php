<?php

namespace App\Http\Controllers;

use App\Mail\ContactUsMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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

        try {
            Mail::to('djex808@gmail.com')->send(new ContactUsMail(data: request()->all()));
        } catch (\Exception $e) {
            return back()->with(['error' => $e->getMessage()]);
        }

        return redirect()->back()->with('success', __('contact')['message_received']);
    }
}
