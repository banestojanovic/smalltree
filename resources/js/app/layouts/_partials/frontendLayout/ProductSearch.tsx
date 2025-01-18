import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import useNumberFormatter from '@/functions';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductSearch = () => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
            router.get(route('products.search-page', { search: query }));
        }
    }

    return (
        <div className="relative mx-auto mr-4 w-full" ref={dropdownRef}>
            <div className="flex items-center">
                <div className={`hidden items-center lg:gap-x-1.5 xl:flex`}>
                    <span>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`size-5`}>
                            <path
                                d="M8.64815 16.7963C13.1482 16.7963 16.7963 13.1482 16.7963 8.64815C16.7963 4.14805 13.1482 0.5 8.64815 0.5C4.14805 0.5 0.5 4.14805 0.5 8.64815C0.5 13.1482 4.14805 16.7963 8.64815 16.7963Z"
                                stroke="black"
                            />
                            <path d="M14.5742 14.5741L20.5001 20.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <Label htmlFor={`productSearch`} className="mr-2 font-normal">
                        {t('menu.top.search')}
                    </Label>
                </div>
                <div className={`relative w-full`}>
                    <Input
                        id={`productSearch`}
                        autoComplete="off"
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        onKeyDown={(event) => (event.key === 'Enter' ? gotoSearchPage() : '')}
                        placeholder={t('menu.top.search_in_products')}
                        className="w-full border-border bg-input text-sm shadow-none placeholder:italic placeholder:text-foreground lg:ml-4"
                    />

                    {isLoading && (
                        <span className={`absolute right-2`}>
                            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    )}

                    {isDropdownOpen && (
                        <div className="absolute left-0 z-20 ml-4 mt-1 max-h-96 w-full overflow-y-auto rounded border bg-input py-2">
                            {results.length < 1 && <div className="flex w-full items-center gap-x-2 px-4 text-sm">{t('menu.top.no_result_found')}</div>}
                            {results.length >= 1 && (
                                <ul className="">
                                    {results.map((product: App.Data.ProductData) => (
                                        <li
                                            key={product.id}
                                            className={cn('cursor-pointer px-4 py-4 hover:bg-primary/10', query === product.name && 'bg-gray-200')}
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                router.get(route('products.show', product.slug));
                                            }}
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
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSearch;
