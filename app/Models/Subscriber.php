<?php

namespace App\Models;

use App\SubscriberStatus;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    public $fillable = [
        'email',
        'status',
    ];

    public $casts = [
        'status' => SubscriberStatus::class,
    ];
}
