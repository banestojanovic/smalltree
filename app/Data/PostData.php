<?php

namespace App\Data;

use App\PostStatus;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PostData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public ?string $content,
        public PostStatus $status,
        public ?Media $cover,
        public ?MediaCollection $photos,
    ) {}
}
