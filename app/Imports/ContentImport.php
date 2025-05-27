<?php

namespace App\Imports;

use App\Models\AttributeValue;
use App\Models\Product;
use App\ProductStatus;
use App\ProductStockStatus;
use App\Support\Disk;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ContentImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {
            if (empty($row['sifra_proizvoda_prodavca'])) {
                continue;
            }

            $data = [
                'ingredients' => trim($row['sastojci']),
                'default_variant' => trim($row['prodajna_jedinica']),
                'tax_class' => trim($row['poreska_klasa']),
                'valid_until' => trim($row['najbolje_upotrebiti_do']),
            ];

            if ($row['naziv_proizvoda'] === 'Rose White Monkey') {
                $data['similar_products'] = [37, 39];
            }

            $product = Product::create([
                'name' => trim($row['naziv_proizvoda']),
                'product_type_id' => $row['type'] ?? 1,
                'sku' => trim($row['sifra_proizvoda_prodavca']),
                'description' => trim($row['opis']),
                'price' => (int) trim($row['prodajna_cena']),
                'stock_status' => ProductStockStatus::IN_STOCK,
                'status' => ProductStatus::ACTIVE,
                'data' => $data,
            ]);

            if (in_array($product->name, ['Earl Grey Superior', 'Bora Bora'])) {
                $product->stock_status === ProductStockStatus::OUT_OF_STOCK;
                $product->save();
            }

            if ($product->name === 'Rose White Monkey') {
            }

            if (! empty($row['url_slika'])) {
                $this->importThumbnail($product, $row['url_slika']);
            }

            try {
                $product->categories()->attach(array_filter(explode(',', $row['kat'])));
            } catch (\Exception $e) {
                // do nothing
            }

            // attributes.
            $country = $this->importValue(1, ucwords(strtolower(trim($row['zemlja_porekla']))));
            if ($country) {
                $product->attributes()->attach($country);
            }

            $caffeine = $this->importValue(2, $row['sadrzaj_kofeina']);
            if ($caffeine) {
                $product->attributes()->attach($caffeine);
            }

            $prepare = $this->importValue(3, $row['nacin_pripreme']);
            if ($prepare) {
                $product->attributes()->attach($prepare);
            }

            $infusions = $this->importValue(4, $row['broj_infuzija']);
            if ($infusions) {
                $product->attributes()->attach($infusions);
            }

            $allergens = $this->importValue(5, $row['alergeni']);
            if ($allergens) {
                $product->attributes()->attach($allergens);
            }
        }
    }

    public function importThumbnail(Product $product, string $url): void
    {
        if (empty($url)) {
            return;
        }

        //        $manager = new ImageManager(new Driver);
        //        $image = $manager->read(file_get_contents($url));
        //
        //        $webpImage = $image->encode(new WebpEncoder(quality: 100));

        $filePath = "dummy/server/{$product->id}.webp";
        //        Storage::disk('public')->put($filePath, $webpImage);

        $product->addMediaFromDisk($filePath, 'public')
            ->preservingOriginal()
            ->withProperties(['uuid' => Str::uuid()])
            ->setOrder(1)
            ->toMediaCollection(Disk::ProductImages, Disk::ProductImages);
    }

    public function importValue(int $id, ?string $value): ?int
    {
        if (empty($value)) {
            return null;
        }

        $value = $this->findCountry(preg_replace('/\s+/', ' ', trim($value)));

        $attr = AttributeValue::where('attribute_id', $id)->whereJsonContainsLocale('value', 'sr', $value)->first();

        if (! $attr) {
            $attr = AttributeValue::create([
                'attribute_id' => $id,
                'value' => $value,
            ]);
        }

        return $attr->id;
    }

    public function findCountry(string $country): string
    {
        $country = ucwords(strtolower($country));
        if ($country === 'Rep.Češka') {
            return 'Republika Češka';
        }
        if ($country === 'Rep. Češka') {
            return 'Republika Češka';
        }
        if ($country === 'Juž. Afrika') {
            return 'Južna Afrika';
        }

        return preg_replace('/\b[xX]\b/', 'Nema', $country);
    }
}
