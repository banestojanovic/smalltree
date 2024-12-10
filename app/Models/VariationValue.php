<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Translatable\HasTranslations;

class VariationValue extends Model
{
    /** @use HasFactory<\Database\Factories\VariationValueFactory> */
    use HasFactory;

    use HasTranslations;

    protected $fillable = [
        'variation_id',
        'value',
        'data',
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
