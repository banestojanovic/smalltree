<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Variation extends Model
{
    /** @use HasFactory<\Database\Factories\VariationFactory> */
    use HasFactory;

    use HasTranslations;

    protected $fillable = [
        'name',
        'description',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public array $translatable = ['name'];
}
