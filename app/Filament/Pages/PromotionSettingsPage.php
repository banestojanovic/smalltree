<?php

namespace App\Filament\Pages;

use App\Models\Product;
use App\Settings\PromotionSettings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class PromotionSettingsPage extends SettingsPage
{
    protected static string $settings = PromotionSettings::class;

    protected static ?string $navigationGroup = 'Settings';

    protected static ?string $title = 'Promotions';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()->schema([
                    Forms\Components\Select::make('promoted_products')
                        ->label('Promoted Products')
                        ->options(fn () => Product::all()->pluck('name', 'id')->toArray())
                        ->multiple()
                        ->required(),
                ]),
            ]);
    }
}
