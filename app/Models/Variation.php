<?php

namespace App\Models;

use App\VariationSearchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Translatable\HasTranslations;

class Variation extends Model implements Sortable
{
    /** @use HasFactory<\Database\Factories\VariationFactory> */
    use HasFactory;

    use HasTranslations;
    use SortableTrait;

    protected $fillable = [
        'name',
        'searchable',
        'description',
        'order_column',
        'data',
    ];

    protected $casts = [
        'searchable' => VariationSearchable::class,
        'data' => 'array',
    ];

    public array $translatable = ['name'];

    public function values(): HasMany
    {
        return $this->hasMany(VariationValue::class);
    }
}
