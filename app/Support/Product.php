<?php

namespace App\Support;

use App\Data\ProductData;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Product
{
    public function transformProductPackagesArray(array $promoPackages): array
    {
        //app|todo maybe should be cached.
        $productIds = collect($promoPackages)
            ->pluck('products')
            ->flatten()
            ->unique()
            ->filter()
            ->all();

        $products = ProductData::collect(\App\Models\Product::query()
            ->with('variations.discount', 'discount', 'cover', 'categories')
            ->with([
                'variations' => function ($query) {
                    $query->with('variations')
                        ->select('product_variations.*');
                },
            ])
            ->whereIn('id', $productIds)
            ->get()
            ->keyBy('id'));

        return collect($promoPackages)->map(function ($package) use ($products) {
            $package['products'] = collect($package['products'])
                ->map(fn ($id) => $products->get($id))
                ->filter()
                ->all();

            return $package;
        })->all();
    }

    public function transformPromoPackages(array $promoPackages): array
    {
        $packages = $this->transformProductPackagesArray($promoPackages);

        return collect($packages)->map(function ($package) {
            $package['bg_image'] = ! empty($package['bg_image'][0]) ? Storage::disk(Disk::Attachments)->url($package['bg_image'][0]) : asset('storage/site/images/hero_art.webp');

            return $package;
        })->all();
    }
}
