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
                    Forms\Components\Tabs\Tab::make('Proizvodi na akciji')
                        ->schema([
                            Forms\Components\Select::make('action_products')
                                ->label('Na akciji')
                                ->options(fn () => Product::all()->pluck('name', 'id')->toArray())
                                ->multiple(),
                        ]),
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
                    Forms\Components\Tabs\Tab::make('Novo')->schema([
                        Forms\Components\TextInput::make('new_title.sr')
                            ->label('Title'),
                        Forms\Components\TextInput::make('new_subtitle.sr')
                            ->label('Title'),
                        Forms\Components\Select::make('new_products')
                            ->label('Promoted Products')
                            ->options(fn () => Product::all()->pluck('name', 'id')->toArray())
                            ->multiple(),
                        Forms\Components\FileUpload::make('new_bg_image')
                            ->openable()
                            ->reorderable()
                            ->multiple()
                            ->image()
                            ->panelLayout('grid')
                            ->appendFiles()
                            ->disk(Disk::Attachments)
                            ->columnSpanFull(),
                    ]),
                    Forms\Components\Tabs\Tab::make('Promovisani pribor')->schema([
                        Forms\Components\Select::make('promoted_product_sets')
                            ->label('Pribor za čaj')
                            ->options(fn () => Product::where('product_type_id', 2)->get()->pluck('name', 'id')->toArray())
                            ->multiple(),
                    ]),
                    Forms\Components\Tabs\Tab::make('Promo Paketi')->schema([
                        Forms\Components\Repeater::make('promo_packages')->schema([
                            Forms\Components\TextInput::make('title.sr')
                                ->label('Title'),
                            Forms\Components\TextInput::make('subtitle.sr')
                                ->label('Podnaslov'),
                            Forms\Components\Select::make('products')
                                ->label('Promoted Products')
                                ->options(fn () => Product::all()->pluck('name', 'id')->toArray())
                                ->multiple(),
                            Forms\Components\FileUpload::make('bg_image')
                                ->openable()
                                ->reorderable()
                                ->multiple()
                                ->image()
                                ->panelLayout('grid')
                                ->appendFiles()
                                ->disk(Disk::Attachments)
                                ->columnSpanFull(),
                        ]),
                    ]),
                ])->columnSpanFull()->contained(false),
            ]);
    }
}
