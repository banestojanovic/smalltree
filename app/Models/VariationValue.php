<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Translatable\HasTranslations;

class VariationValue extends Model implements Sortable
{
    /** @use HasFactory<\Database\Factories\VariationValueFactory> */
    use HasFactory;

    use HasTranslations;
    use SortableTrait;

    protected $fillable = [
        'variation_id',
        'value',
        'is_default',
        'data',
        'order_column',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public array $translatable = ['value'];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Productvariation::class);
    }

    public function variation(): BelongsTo
    {
        return $this->belongsTo(Variation::class);
    }
}
