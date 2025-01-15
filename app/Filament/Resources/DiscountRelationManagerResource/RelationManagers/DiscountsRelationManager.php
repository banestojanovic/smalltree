<?php

namespace App\Filament\Resources\DiscountRelationManagerResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class DiscountsRelationManager extends RelationManager
{
    protected static string $relationship = 'discount';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('product_id')
                    ->readOnly()
                    ->default(fn ($livewire) => $livewire->ownerRecord->id)
                    ->required(),
                Forms\Components\Select::make('product_variation_id')
                    ->preload()
                    ->searchable()
                    ->options(fn ($livewire, $record) => \App\Models\ProductVariation::with('variations')
                        ->where('product_id', $livewire->ownerRecord->id)
                        ->get()
                        ->flatMap(fn ($productVariation) => $productVariation->variations->mapWithKeys(fn ($value) => [
                            $productVariation->id => $value->value,
                        ]))
                    )
                    ->helperText('Leave empty to apply to all variations'),
                Forms\Components\TextInput::make('price')
                    ->numeric()
                    ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                    ->prefix('rsd'),
                Forms\Components\TextInput::make('percentage')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(99)
                    ->suffix('%'),
                Forms\Components\DateTimePicker::make('starts_at')
                    ->required(),
                Forms\Components\DateTimePicker::make('ends_at')
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('product_id')
            ->columns([
                Tables\Columns\TextColumn::make('product.name'),
                Tables\Columns\TextColumn::make('productVariation.variations.value'),
                Tables\Columns\TextColumn::make('price')->money('rsd'),
                Tables\Columns\TextColumn::make('starts_at')
                    ->dateTime(),
                Tables\Columns\TextColumn::make('ends_at')
                    ->dateTime(),
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
