<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Translatable\HasTranslations;

class AttributeValue extends Model implements Sortable
{
    /** @use HasFactory<\Database\Factories\AttributeValueFactory> */
    use HasFactory;

    use HasTranslations;
    use SortableTrait;

    protected $fillable = [
        'attribute_id',
        'value',
        'order_column',
        'data',
    ];

    protected array $translatable = ['value'];

    protected $casts = [
        'value' => 'array',
        'data' => 'array',
    ];

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
