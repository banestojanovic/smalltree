<?php

namespace App\Models;

use App\AttributeType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Attribute extends Model implements Sortable
{
    /** @use HasFactory<\Database\Factories\AttributeFactory> */
    use HasFactory;

    use HasSlug;
    use HasTranslations;
    use SortableTrait;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'data',
        'order_column',
    ];

    protected $casts = [
        'type' => AttributeType::class,
        'data' => 'array',
    ];

    public array $translatable = ['name'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function values(): HasMany
    {
        return $this->hasMany(AttributeValue::class);
    }
}
