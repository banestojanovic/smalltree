<?php

namespace App\Filament\Pages;

use App\Models\Product;
use App\Settings\PromotionSettings;
use App\Support\Disk;
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
                Forms\Components\Tabs::make()->tabs([
                    Forms\Components\Tabs\Tab::make('Promoted products')->schema([
                        Forms\Components\Select::make('promoted_products')
                            ->label('Promoted Products')
                            ->options(fn () => Product::all()->pluck('name', 'id')->toArray())
                            ->multiple(),
                    ]),
                    Forms\Components\Tabs\Tab::make('Tea of month')->schema([
                        Forms\Components\TextInput::make('tea_of_the_month_title.sr')
                            ->label('Title'),
                        Forms\Components\TextInput::make('tea_of_the_month_subtitle.sr')
                            ->label('Title'),
                        Forms\Components\Select::make('tea_of_the_month_products')
                            ->label('Promoted Products')
                            ->options(fn () => Product::all()->pluck('name', 'id')->toArray())
                            ->multiple(),
                        Forms\Components\FileUpload::make('tea_of_the_month_bg_image')
                            ->openable()
                            ->reorderable()
                            ->multiple()
                            ->image()
                            ->panelLayout('grid')
                            ->appendFiles()
                            ->disk(Disk::Attachments)
                            ->columnSpanFull(),
                    ]),
                    Forms\Components\Tabs\Tab::make('Special Offer')->schema([
                        Forms\Components\TextInput::make('special_offer_title.sr')
                            ->label('Title'),
                        Forms\Components\TextInput::make('special_offer_subtitle.sr')
                            ->label('Title'),
                        Forms\Components\Select::make('special_offer_products')
                            ->label('Promoted Products')
                            ->options(fn () => Product::all()->pluck('name', 'id')->toArray())
                            ->multiple(),
                        Forms\Components\FileUpload::make('special_offer_bg_image')
                            ->openable()
                            ->reorderable()
                            ->multiple()
                            ->image()
                            ->panelLayout('grid')
                            ->appendFiles()
                            ->disk(Disk::Attachments)
                            ->columnSpanFull(),
                    ]),
                ])->contained(false),
            ]);
    }
}
