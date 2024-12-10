<?php

namespace App\Filament\Resources\VariationResource\Pages;

use App\Filament\Resources\VariationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditVariation extends EditRecord
{
    use EditRecord\Concerns\Translatable;

    protected static string $resource = VariationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
