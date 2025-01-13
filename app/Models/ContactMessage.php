<?php

namespace App\Models;

use App\SubscriberStatus;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    public $fillable = [
        'name',
        'email',
        'phone',
        'message',
    ];

}
