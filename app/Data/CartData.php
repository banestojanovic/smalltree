<?php

namespace App\Data;

use App\ProductStatus;
use App\ProductStockStatus;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CartData extends Data
{
    public function __construct(
        public int $id,
        public string $session,
        #[DataCollectionOf(CartProductData::class)]
        public ?Collection $products,
    ) {}
}
