<?php

namespace App\Data;

use App\SubscriberStatus;
use Spatie\LaravelData\Data;

class SubscriberData extends Data
{
    public function __construct(
        public int $id,
        public string $email,
        public ?SubscriberStatus $status,
    ) {}
}
