<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use App\Models\Product;
use App\OrderPaymentMethod;
use App\OrderStatus;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = 'Porudžbine';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('uuid')
                    ->label('UUID')
                    ->disabled()
                    ->required()
                    ->maxLength(36),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name'),
                Forms\Components\TextInput::make('shipping')
                    ->prefix('RSD')
                    ->numeric(),
                Forms\Components\TextInput::make('total')
                    ->prefix('RSD')
                    ->required()
                    ->numeric(),
                Forms\Components\Select::make('payment_method')
                    ->options(OrderPaymentMethod::class)
                    ->required(),
                Forms\Components\Select::make('status')
                    ->required()
                    ->options(OrderStatus::class)
                    ->default(1),
                Forms\Components\Section::make('buyer')
                    ->relationship('user')
                    ->schema([
                        Forms\Components\TextInput::make('name')->disabled(),
                        Forms\Components\TextInput::make('email')->disabled(),
                    ])->compact(),
                Forms\Components\Section::make('shipping')
                    ->schema([
                        Forms\Components\TextInput::make('data.shipping.phone')->disabled(),
                        Forms\Components\TextInput::make('data.shipping.address')->disabled(),
                        Forms\Components\TextInput::make('data.shipping.city')->disabled(),
                        Forms\Components\TextInput::make('data.shipping.postal_code')->disabled(),
                        Forms\Components\Textarea::make('data.note')->disabled(),
                    ])->compact(),

                Forms\Components\Section::make('Proizvodi')->schema([
                    Forms\Components\Repeater::make('cart.products')
                        ->reorderable(false)
                        ->columnSpanFull()
                        ->schema([
                            Forms\Components\Select::make('name')->label(__('title'))
                                ->searchable()
                                ->options(fn () => Product::pluck('id', 'id')),
                            Forms\Components\TextInput::make('pivot.quantity')->numeric()->label(__('quantity')),
                            Forms\Components\TextInput::make('pivot.price')
                                ->prefix('RSD')
                                ->label(__('price')),
                            Forms\Components\TextInput::make('variation.value')->prefix('pakovanje')->label(__('Variation')),
                        ]),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->paginated([10, 25, 50])
            ->defaultSort('updated_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('shippingAddress.city')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('total')
                    ->suffix(' RSD')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('payment_method')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (OrderStatus $state): string => match ($state) {
                        OrderStatus::SENT, OrderStatus::COMPLETED => 'success',
                        OrderStatus::CREATED, OrderStatus::PAID, OrderStatus::PENDING => 'info',
                        OrderStatus::DECLINED, OrderStatus::CANCELLED => 'danger',
                        default => 'gray',
                    })
                    ->icon(fn (OrderStatus $state): string => match ($state) {
                        OrderStatus::SENT, OrderStatus::COMPLETED => 'heroicon-o-check-circle',
                        OrderStatus::CREATED, OrderStatus::PENDING => 'heroicon-o-arrow-path-rounded-square',
                        OrderStatus::PAID => 'heroicon-o-banknotes',
                        OrderStatus::DECLINED, OrderStatus::CANCELLED => 'heroicon-o-trash',
                        default => 'heroicon-o-information-circle',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label(__('status'))
                    ->options(OrderStatus::class)
                    ->default([OrderStatus::CREATED->value, OrderStatus::PAID->value])
                    ->multiple(),
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

    public static function getNavigationBadge(): ?string
    {
        return static::$model::whereIn('status', [OrderStatus::CREATED, OrderStatus::PAID])->count();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
