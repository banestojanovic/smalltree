<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CreateUser
{
    /**
     * @throws ValidationException
     */
    public function execute(): User
    {

        $user = User::where('email', request('email'))->firstOrCreate([
            'email' => request('email'),
        ], [
            'name' => request('first_name').' '.request('last_name'),
            'password' => request('password') ?? Hash::make('password'),
        ]);

        $user->address()->updateOrCreate([
            'company' => request('company'),
            'phone' => request('phone'),
            'address_line_1' => request('address'),
            'city' => request('city'),
            'postal_code' => request('postal_code'),
            'is_default' => request('is_default'),
        ]);

        return $user->load('address');
    }
}
