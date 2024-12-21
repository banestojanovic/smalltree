<?php

namespace App\Models;

use App\PostStatus;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Tags\HasTags;
use Spatie\Translatable\HasTranslations;

class Post extends Model implements HasMedia, Sortable
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;
    use HasSlug;
    use HasTags;
    use InteractsWithMedia;
    use HasTranslations;
    use SoftDeletes;
    use SortableTrait;

    protected $fillable = [
        'name',
        'slug',
        'content',
        'status',
        'order_column',
        'data',
    ];

    protected $casts = [
        'status' => PostStatus::class,
        'data' => 'array',
    ];

    protected array $translatable = ['name', 'content'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    protected $appends = [
        'date_created',
    ];


    public function cover(): MorphOne
    {
        return $this->morphOne(Media::class, 'model')->where('collection_name', Disk::PostImages)->orderBy('order_column');
    }

    public function photos(): MorphMany
    {
        return $this->morphMany(Media::class, 'model')->where('collection_name', Disk::PostImages)->orderBy('order_column');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(PostCategory::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', PostStatus::ACTIVE);
    }

    public function getDateCreatedAttribute(): string
    {
        return $this->created_at?->format('F j, Y'); // e.g., "November 23, 2024"
    }
}
