<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class AddressData extends Data
{
    public function __construct(
        public int $id,
        public int $user_id,
        public string $phone,
        public string $address_line_1,
        public ?string $address_line_2,
        public string $city,
        public string $postal_code,
    ) {}
}
