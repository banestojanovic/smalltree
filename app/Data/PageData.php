<?php

namespace App\Data;

use App\PageStatus;
use Spatie\LaravelData\Data;

class PageData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public ?string $content,
        public ?PageStatus $status,
    ) {}
}
