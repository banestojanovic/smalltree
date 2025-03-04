<?php

namespace App\Filament\Resources\ProductVariationResource\RelationManagers;

use App\Models\Variation;
use App\ProductStockStatus;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductVariationsRelationManager extends RelationManager
{
    protected static string $relationship = 'variations';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('test')
                    ->live(onBlur: true)
                    ->options(fn () => Variation::pluck('name', 'id'))
                    ->afterStateHydrated(function ($record, $livewire, $get, $set) {
                        if ($record?->variations?->first()?->variation_id) {
                            $set('test', $record->variations->first()?->variation_id);
                        }
                    })
                    ->dehydrated(false),
                Forms\Components\Select::make('variation_value_id')
                    ->multiple()
                    ->preload()
                    ->required()
                    ->relationship(
                        name: 'variations',
                        titleAttribute: 'value',
                        modifyQueryUsing: function (Builder $query, $livewire, $get) {
                            $isNewRecord = ! $livewire->ownerRecord->exists;

                            if (! $isNewRecord) {
                                return $query;
                            }
                            $usedVariationValueIds = \App\Models\ProductVariation::where('product_id', $livewire->ownerRecord->id)
                                ->with('variations')
                                ->get()
                                ->flatMap(fn ($productVariation) => $productVariation->variations->pluck('id'))
                                ->unique()
                                ->toArray();

                            return $query->where('variation_id', $get('test'))->whereNotIn('variation_values.id', $usedVariationValueIds);
                        },
                    ),
                Forms\Components\TextInput::make('sku')
                    ->required()
                    ->default(fn ($livewire) => $livewire->ownerRecord->sku)
                    ->maxLength(255),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->default(fn ($livewire) => $livewire->ownerRecord->price)
                    ->maxLength(255),
                Forms\Components\TextInput::make('stock')
                    ->default(fn ($livewire) => $livewire->ownerRecord->stock)
                    ->maxLength(255),
                Forms\Components\Select::make('stock_status')
                    ->required()
                    ->options(ProductStockStatus::class),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('sku')
            ->columns([
                Tables\Columns\TextColumn::make('variations.variation.name')->label('Variation'),
                Tables\Columns\TextColumn::make('variations.value')->label('Value'),
                Tables\Columns\TextColumn::make('sku'),
                Tables\Columns\TextColumn::make('price')->money('rsd'),
                Tables\Columns\TextColumn::make('stock'),
                Tables\Columns\TextColumn::make('stock_status'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
