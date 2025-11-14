<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Models\Category;
use App\Support\Disk;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Concerns\Translatable;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    use Translatable;

    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationParentItem = 'Products';

    protected static ?string $navigationGroup = 'Products';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($get, $set) => $set('slug', Str::slug($get('name')))),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->disabled()
                    ->unique(Category::class, 'slug', ignoreRecord: true)
                    ->maxLength(255),
                Forms\Components\Select::make('parent_id')
                    ->preload()
                    ->searchable()
                    ->options(fn () => Category::where('parent_id', null)->pluck('name', 'id')),
                Forms\Components\Textarea::make('description')
                    ->columnSpanFull(),

                Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                    ->openable()
                    ->reorderable()
                    ->multiple()
                    ->image()
                    ->appendFiles()
                    ->panelLayout('grid')
                    ->disk(Disk::CategoryImages)
                    ->collection(Disk::CategoryImages)
                    ->columnSpanFull(),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('order_column')
            ->columns([
                Tables\Columns\ImageColumn::make('cover.original_url')->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('parent.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('top_level')
                    ->label(__('filters.top_level_categories'))
                    ->query(fn (Builder $query): Builder => $query->whereNull('parent_id')),
                Tables\Filters\SelectFilter::make('parent_id')
                    ->options(fn () => Category::where('parent_id', null)->pluck('name', 'id')),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
