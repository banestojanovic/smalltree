<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use App\Support\Disk;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class GeneralSettingsPage extends SettingsPage
{
    protected static string $settings = GeneralSettings::class;

    protected static ?string $navigationGroup = 'Settings';

    protected static ?string $navigationLabel = 'General';

    public function form(Form $form): Form
    {
        return $form
            ->columns(1)
            ->schema([
                Forms\Components\Tabs::make()->tabs([
                    Forms\Components\Tabs\Tab::make('General')->schema([
                        Forms\Components\Section::make()->schema([
                            Forms\Components\TextInput::make('site_name')
                                ->label('Site Name')
                                ->required(),
                            Forms\Components\Toggle::make('site_active'),
                        ]),
                    ]),
                    Forms\Components\Tabs\Tab::make('Hero')->schema([
                        Forms\Components\TextInput::make('hero_title.sr')
                            ->label('Title')
                            ->required(),
                        Forms\Components\Textarea::make('hero_subtitle.sr')
                            ->label('Description'),
                        Forms\Components\FileUpload::make('hero_image')
                            ->openable()
                            ->reorderable()
                            ->multiple()
                            ->image()
                            ->panelLayout('grid')
                            ->appendFiles()
                            ->disk(Disk::Attachments)
                            ->maxSize(1024)
                            ->columnSpanFull(),
                    ]),
                ])->contained(false),
            ]);
    }
}
