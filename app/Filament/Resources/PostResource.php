<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use App\PostStatus;
use App\Support\Disk;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Concerns\Translatable;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PostResource extends Resource
{
    use Translatable;

    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Blog';

    protected static ?int $navigationSort = 20;

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
                            ->unique(Post::class, 'slug', ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\RichEditor::make('content')
                            ->fileAttachmentsDirectory('attachments')
                            ->columnSpanFull(),

                        Forms\Components\Select::make('categories')
                            ->preload()
                            ->multiple()
                            ->searchable()
                            ->relationship(name: 'categories', titleAttribute: 'name'),

                        Forms\Components\SpatieTagsInput::make('tags'),
                    ]),
                ])->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()->schema([
                    Forms\Components\Section::make('Status')->schema([
                        Forms\Components\Select::make('status')
                            ->required()
                            ->options(PostStatus::class)
                            ->default(1),

                        Forms\Components\Grid::make('Status')->columns()
                            ->visibleOn('edit')
                            ->schema([
                                Forms\Components\Placeholder::make('created_at')
                                    ->label('Created at')
                                    ->content(fn (Post $record): ?string => $record->created_at?->diffForHumans())
                                    ->columnSpan(1),

                                Forms\Components\Placeholder::make('updated_at')
                                    ->label('Last modified at')
                                    ->content(fn (Post $record): ?string => $record->updated_at?->diffForHumans())
                                    ->columnSpan(1),
                            ]),
                    ]),

                    Forms\Components\SpatieMediaLibraryFileUpload::make('images')
                        ->openable()
                        ->reorderable()
                        ->multiple()
                        ->image()
                        ->panelLayout('grid')
                        ->appendFiles()
                        ->disk(Disk::PostImages)
                        ->collection(Disk::PostImages)
                        ->columnSpanFull(),
                ])->columnSpan(['lg' => 1]),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordClasses(function (Model $record) {
                if ($record->deleted_at) {
                    return 'opacity-50';
                }

                return null;
            })
            ->reorderable('order_column')
            ->columns([
                Tables\Columns\ImageColumn::make('cover.original_url')->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
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
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('force_delete')
                    ->label('Force Delete')
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->action(function ($record) {
                        $record->forceDelete();
                    })
                    ->visible(fn ($record) => $record->trashed()),
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
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
