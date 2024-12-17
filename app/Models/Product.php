<?php

namespace App\Models;

use App\ProductStatus;
use App\ProductStockStatus;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
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

class Product extends Model implements HasMedia, Sortable
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    use HasSlug;
    use HasTags;
    use HasTranslations;
    use InteractsWithMedia;
    use SoftDeletes;
    use SortableTrait;

    protected $fillable = [
        'name',
        'slug',
        'sku',
        'price',
        'stock',
        'stock_status',
        'description',
        'status',
        'order_column',
        'data',
    ];

    protected $casts = [
        'status' => ProductStatus::class,
        'stock_status' => ProductStockStatus::class,
        'data' => 'array',
    ];

    public array $translatable = ['name', 'description'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    protected function price(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value / 100,
            set: fn ($value) => $value * 100,
        );
    }

    public function cover(): MorphOne
    {
        return $this->morphOne(Media::class, 'model')->where('collection_name',
            Disk::ProductImages)->orderBy('order_column');
    }

    public function photos(): MorphMany
    {
        return $this->morphMany(Media::class, 'model')->where('collection_name',
            Disk::ProductImages)->orderBy('order_column');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function attributes(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValue::class);
    }

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class);
    }

    public function discount(): HasOne
    {
        return $this->hasOne(Discount::class);
    }

    protected static function booted(): void
    {
        static::created(function (Product $product) {
            $variations = VariationValue::all();
            $variations->each(function (VariationValue $variation) use ($product) {
                $price = $product->price;
                if ($product->price === 0) {
                    return;
                }
                if ($variation->getTranslation('value', 'sr') === '50g') {
                    $price = $product->price * 0.5;
                }
                if ($variation->getTranslation('value', 'sr') === '250g') {
                    $price = $product->price * 2.5;
                }
                $product->variations()->create([
                    'sku' => $product->sku,
                    'price' => $price,
                    'stock' => $product->stock,
                    'stock_status' => $product->stock_status,
                ])->variations()->attach($variation);
            });
        });

        static::saved(function (Product $product) {
            if ($product->variations()->exists()) {
                $product->variations()->with('variations')->each(function (ProductVariation $variation) use ($product) {
                    $price = $product->price;
                    if ($product->price === 0) {
                        return;
                    }
                    if ($variation->variations->first()->getTranslation('value', 'sr') === '50g') {
                        $price = $product->price * 0.5;
                    }
                    if ($variation->variations->first()->getTranslation('value', 'sr') === '250g') {
                        $price = $product->price * 2.5;
                    }
                    $variation->update([
                        'sku' => $product->sku,
                        'price' => $price,
                        'stock' => $product->stock,
                        'stock_status' => $product->stock_status,
                    ]);
                });
            }

            if (! $product->variations()->exists()) {
                $variations = VariationValue::all();
                $variations->each(function (VariationValue $variation) use ($product) {
                    $price = $product->price;
                    if ($product->price === 0) {
                        return;
                    }
                    if ($variation->getTranslation('value', 'sr') === '50g') {
                        $price = $product->price * 0.5;
                    }
                    if ($variation->getTranslation('value', 'sr') === '250g') {
                        $price = $product->price * 2.5;
                    }
                    $product->variations()->create([
                        'sku' => $product->sku,
                        'price' => $price,
                        'stock' => $product->stock,
                        'stock_status' => $product->stock_status,
                    ])->variations()->attach($variation);
                });
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('status', ProductStatus::ACTIVE);
    }

    public function scopeIsAvailable($query)
    {
        return $query->where('stock_status', ProductStockStatus::IN_STOCK);
    }
}
