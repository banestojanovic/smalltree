<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use Illuminate\Database\Seeder;

class AttributeValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $values = collect([
            1 => [
                'Kina', 'Indija', 'Šri Lanka', 'Japan', 'Brazil', 'Južna Afrika', 'Republka Češka',
                'Japan/Kagoshima prefektura', 'Japan/Uji Prefektura', 'Nemačka', 'Srbija',
            ],
            2 => ['Nema', 'Nizak', 'Srednji', 'Visok'],
            3 => ['3g 100°C 3-5 min', '2.5g 100°C 3 min', '3g 70-80°C 2-3 min'],
            4 => ['1', '2', '3', '4', '5'],
            5 => [
                'Nema', 'Može sadržati orahe u tragovima', 'Mleko, soja, može sadržati orahe u tragovima',
                'Nije pogodan za decu.', 'Osobe sa povišenoim krvnim pritiskom trebalo bi da izbegavaju sladić.',
            ],
        ]);

        $data = $values->flatMap(function ($valueArray, $attributeId) {
            return collect($valueArray)->map(function ($value) use ($attributeId) {
                return [
                    'attribute_id' => $attributeId,
                    'value' => $value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });
        })->toArray();

        AttributeValue::insert($data);
    }
}
