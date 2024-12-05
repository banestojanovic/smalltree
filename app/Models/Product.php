<?php

namespace App\Models;

use App\ProductStatus;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    use HasSlug;
    use HasTranslations;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'sku',
        'stock',
        'price',
        'sale_price',
        'description',
        'status',
        'data',
    ];

    protected $casts = [
        'status' => ProductStatus::class,
        'data'   => 'array',
    ];

    public array $translatable = ['name'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
                          ->generateSlugsFrom('name')
                          ->saveSlugsTo('slug');
    }

    protected function price(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value / 100,
            set: fn($value) => $value * 100,
        );
    }

    protected function salePrice(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? $value / 100 : null,
            set: fn($value) => $value ? $value * 100 : null,
        );
    }

    public function cover(): MorphOne
    {
        return $this->morphOne(Media::class, 'model')->where('collection_name', Disk::ProductImages)->orderBy('order_column');
    }

    public function photos(): MorphMany
    {
        return $this->morphMany(Media::class, 'model')->where('collection_name', Disk::ProductImages)->orderBy('order_column');
    }
}
