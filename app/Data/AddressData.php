<?php

namespace App\Data;

use App\OrderStatus;
use App\ProductStatus;
use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AddressData extends Data
{

    public function __construct(
        public int    $id,
        public int    $user_id,
        public string $phone,
        public string $address_line_1,
        public string $address_line_2,
        public string $city,
        public string $postal_code,
    )
    {
    }
}
