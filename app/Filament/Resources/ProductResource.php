<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DiscountRelationManagerResource\RelationManagers\DiscountsRelationManager;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductVariationResource\RelationManagers\ProductVariationsRelationManager;
use App\Models\Attribute;
use App\Models\Product;
use App\ProductStatus;
use App\ProductStockStatus;
use App\Support\Disk;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Concerns\Translatable;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    use Translatable;

    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-bolt';

    protected static ?string $navigationGroup = 'Products';

    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form
            ->columns(3)
            ->schema([
                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make('General')->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($get, $set) => $set('slug', Str::slug($get('name')))),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->disabled()
                            ->unique(Product::class, 'slug', ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description')
                            ->columnSpanFull(),
                    ]),
                    Forms\Components\Section::make('Inventory')->schema([
                        Forms\Components\TextInput::make('sku')
                            ->label('SKU')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('price')
                            ->numeric()
                            ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                            ->prefix('$'),
                        Forms\Components\TextInput::make('stock')
                            ->numeric(),
                        Forms\Components\Select::make('stock_status')
                            ->required()
                            ->options(ProductStockStatus::class)
                            ->default(1),
                    ]),
                ])->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make('Status')->schema([
                        Forms\Components\Select::make('status')
                            ->required()
                            ->options(ProductStatus::class)
                            ->default(1),

                        Forms\Components\Grid::make('Status')->columns()
                            ->visibleOn('edit')
                            ->schema([
                                Forms\Components\Placeholder::make('created_at')
                                    ->label('Created at')
                                    ->content(fn (Product $record): ?string => $record->created_at?->diffForHumans())
                                    ->columnSpan(1),

                                Forms\Components\Placeholder::make('updated_at')
                                    ->label('Last modified at')
                                    ->content(fn (Product $record): ?string => $record->updated_at?->diffForHumans())
                                    ->columnSpan(1),
                            ]),
                    ]),

                    Forms\Components\Select::make('categories')
                        ->preload()
                        ->multiple()
                        ->searchable()
                        ->relationship(name: 'categories', titleAttribute: 'name'),

                    Forms\Components\SpatieTagsInput::make('tags')->type('product'),

                    Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                        ->openable()
                        ->reorderable()
                        ->multiple()
                        ->image()
                        ->panelLayout('grid')
                        ->appendFiles()
                        ->disk(Disk::ProductImages)
                        ->collection(Disk::ProductImages)
                        ->columnSpanFull(),
                ])->columnSpan(['lg' => 1]),

                Forms\Components\Section::make('Attributes')->columns(2)->schema(function () {
                    $attributes = Attribute::with('values')->get();

                    return $attributes->map(function ($attribute) {
                        return Forms\Components\Select::make($attribute->name)
                            ->label($attribute->name)
                            ->multiple()
                            ->optionsLimit(1)
                            ->maxItems(1)
                            ->preload()
                            ->options($attribute->values->pluck('value', 'id')) // Directly access related values
                            ->relationship(
                                name: 'attributes',
                                titleAttribute: 'value',
                                modifyQueryUsing: fn ($query) => $query->where('attribute_id', $attribute->id) // Filter query by attribute ID
                            )
                            ->createOptionForm([
                                Forms\Components\TextInput::make('attribute_id')
                                    ->required()
                                    ->readOnly()
                                    ->default($attribute->id),
                                Forms\Components\TextInput::make('value')
                                    ->required(),
                            ]);
                    })->toArray();
                }),
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
                Tables\Columns\TextColumn::make('sku')
                    ->label('SKU')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money('rsd')
                    ->sortable(),
                Tables\Columns\TextColumn::make('stock')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('stock_status')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->sortable(),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
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
                //
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
            ProductVariationsRelationManager::class,
            DiscountsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
