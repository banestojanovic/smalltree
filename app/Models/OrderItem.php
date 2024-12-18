<?php

namespace App\Models;

use App\OrderStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    public $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'discount',
        'tax',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

}
