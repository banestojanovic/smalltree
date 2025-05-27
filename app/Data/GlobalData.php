<?php

namespace App\Data;

use Closure;
use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class GlobalData extends Data
{
    public function __construct(
        public string $env,
        public Closure|string|null $action,
        #[DataCollectionOf(CategoryData::class)]
        public ?Collection $categories,
        public ?array $promoPackages,
        #[DataCollectionOf(PostData::class)]
        public ?Collection $posts,
        public ?array $additional,
        public ?string $notification,
        public ?bool $notificationDismissed,
    ) {}
}
