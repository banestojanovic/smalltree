<?php

namespace App\Data;

use App\PostStatus;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PostData extends Data
{
    #[Computed]
    public string $excerpt;

    #[Computed]
    public ?PostCategoryData $category;

    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $content,
        public PostStatus $status,
        public ?Media $cover,
        public ?MediaCollection $photos,
        public string $date_created,
        #[DataCollectionOf(PostCategoryData::class)]
        public ?Collection $categories,
    ) {
        $this->excerpt = Str::words($this->content, 20);
        $this->category = $this->categories?->first();
    }
}
