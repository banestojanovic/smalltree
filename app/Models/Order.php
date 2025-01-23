<?php

namespace App\Models;

use App\OrderPaymentMethod;
use App\OrderStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Order extends Model
{
    public $fillable = [
        'uuid',
        'user_id',
        'shipping_address_id',
        'cart_id',
        'user_ip',
        'amount',
        'shipping',
        'discount',
        'total',
        'payment_method',
        'status',
        'cart',
        'data',
    ];

    public $casts = [
        'payment_method' => OrderPaymentMethod::class,
        'status' => OrderStatus::class,
        'cart' => 'array',
        'data' => 'array',
    ];

    protected function amount(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => $value * 100,
        );
    }

    protected function total(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => $value * 100,
        );
    }

    protected function shipping(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => $value * 100,
        );
    }

    protected function discount(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => $value * 100,
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function shippingAddress(): BelongsTo
    {
        return $this->belongsTo(Address::class, 'shipping_address_id', 'id');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(NestpayPayment::class, 'INVOICENUMBER');
    }

    public static function booted()
    {
        static::creating(function (Order $order) {
            if (empty($order->uuid)) {
                $order->uuid = Str::orderedUuid();
            }
        });
    }
}
