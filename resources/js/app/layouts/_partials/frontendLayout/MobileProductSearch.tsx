import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import useNumberFormatter from '@/functions';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductSearch = ({ variant }: { variant?: string }) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const formatNumber = useNumberFormatter();

    const debouncedSearch = useRef(
        debounce(async (value: string) => {
            if (value.length > 0) {
                setIsLoading(true);
                try {
                    const response = await axios.get(route('products.search'), {
                        params: { query: value },
                    });
                    setResults(response.data);
                    setIsDropdownOpen(true);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setIsDropdownOpen(false);
            }
        }, 250),
    ).current;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function gotoSearchPage() {
        setIsDropdownOpen(false);
        if (query.length > 0) {
            router.get(route('search.show', { search: query }));
        }
    }

    return (
        <div>
            <Sheet
                open={sheetOpen}
                onOpenChange={(open: boolean) => {
                    setSheetOpen(open);
                    if (!open) {
                        setQuery('');
                    }
                }}
            >
                <SheetTrigger asChild>
                    <Button variant="ghost" className={`mx-auto flex px-2.5 ${variant === 'circled' ? 'size-10 rounded-full' : ''}`}>
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`size-5!`}>
                                <path
                                    d="M8.64815 16.7963C13.1482 16.7963 16.7963 13.1482 16.7963 8.64815C16.7963 4.14805 13.1482 0.5 8.64815 0.5C4.14805 0.5 0.5 4.14805 0.5 8.64815C0.5 13.1482 4.14805 16.7963 8.64815 16.7963Z"
                                    stroke="black"
                                />
                                <path d="M14.5742 14.5741L20.5001 20.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </Button>
                </SheetTrigger>

                <SheetContent className={`space-y-4 overflow-y-auto bg-white px-3 py-6 max-lg:w-11/12 md:px-6`}>
                    <SheetHeader className={`text-left`}>
                        <SheetTitle className={`font-title text-3xl font-medium`}>{t('menu.top.search')}</SheetTitle>
                        <SheetDescription className={`sr-only`}>{t('menu.top.search')}</SheetDescription>
                    </SheetHeader>

                    <div className="relative mx-auto w-full" ref={dropdownRef}>
                        <div className="flex items-center">
                            <div className={`hidden`}>
                                <Label htmlFor={`productSearch`} className="sr-only">
                                    {t('menu.top.search')}
                                </Label>
                            </div>
                            <div className={`relative w-full space-y-2`}>
                                <div className={`relative`}>
                                    <Input
                                        id={`productSearch`}
                                        autoFocus={true}
                                        autoComplete="off"
                                        type="text"
                                        value={query}
                                        onChange={handleSearch}
                                        onKeyDown={(event) => (event.key === 'Enter' ? gotoSearchPage() : '')}
                                        placeholder={t('menu.top.search_in_products')}
                                        className="w-full border-border bg-input text-sm shadow-none placeholder:italic placeholder:text-foreground"
                                    />

                                    {isLoading && (
                                        <span className={`absolute right-2 top-2.5`}>
                                            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    )}
                                </div>

                                {isDropdownOpen && (
                                    <div>
                                        {results.length < 1 && <div className="flex w-full items-center gap-x-2 px-4 text-sm">{t('menu.top.no_result_found')}</div>}
                                        {results.length >= 1 && (
                                            <ul className="divide-y divide-input">
                                                {results.map((product: App.Data.ProductData, index: number) => (
                                                    <motion.li
                                                        key={product.id}
                                                        className={cn('cursor-pointer p-4 hover:bg-accent', query === product.name && 'bg-gray-200')}
                                                        onClick={() => {
                                                            setIsDropdownOpen(false);
                                                            setSheetOpen(false);
                                                            router.get(route('products.show', product.slug));
                                                        }}
                                                        initial={{ y: 50 }}
                                                        whileInView={{ y: 0 }}
                                                        transition={{ type: 'spring', duration: (index + 1) / 4 }}
                                                    >
                                                        <div className="flex items-center justify-between gap-4 text-sm">
                                                            <div className="flex items-center gap-x-4">
                                                                {product.cover?.original_url && (
                                                                    <img className="aspect-square size-12 rounded-md object-cover" src={product.cover?.original_url} alt={product.name} />
                                                                )}
                                                                <span className="text-sm font-medium">{product.name}</span>
                                                            </div>
                                                            <div>
                                                                <div className={`flex items-center space-x-px`}>
                                                                    <span className="font-semibold">{formatNumber(product?.price ?? 0)}</span>
                                                                    <span className={`font-normal`}>rsd</span>
                                                                </div>
                                                                {product?.discount?.price && (
                                                                    <div className={`flex items-center space-x-px text-xs text-foreground/50 line-through`}>
                                                                        <span>{formatNumber(product?.discount?.price)}</span>
                                                                        <span>rsd</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ProductSearch;
