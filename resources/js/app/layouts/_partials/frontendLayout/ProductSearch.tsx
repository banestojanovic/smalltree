import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductSearch = () => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

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
        <div className="relative mx-auto w-full max-w-2xl" ref={dropdownRef}>
            <div className="grid grid-cols-[auto_10%]">
                <Input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={(event) => (event.key === 'Enter' ? gotoSearchPage() : '')}
                    placeholder={t('enums.menu.top.search')}
                    className="w-full"
                />
                <Button variant="outline" onClick={gotoSearchPage}>
                    <ArrowRight />
                </Button>
            </div>
            {isLoading && (
                <div className="absolute left-0 z-20 mt-2 w-full rounded-lg border border-gray-400 bg-white p-2 text-sm text-gray-500 md:left-auto md:right-0">
                    <p className="flex w-full items-center gap-x-2">
                        <span>
                            <svg className="h-5 w-5 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </span>
                        {t('enums.menu.top.loading')}...
                    </p>
                </div>
            )}
            {isDropdownOpen && results.length <= 0 && (
                <div className="absolute left-0 z-20 mt-2 w-full rounded-lg border border-gray-400 bg-white p-2 text-sm text-gray-500 md:left-auto md:right-0">
                    <p className="flex w-full items-center gap-x-2">{t('enums.menu.top.no_result_found')}</p>
                </div>
            )}

            {isDropdownOpen && results.length > 0 && (
                <ul className="absolute left-0 z-20 mt-1 max-h-[700px] w-[17rem] overflow-y-auto rounded border border-gray-300 bg-white shadow-lg md:left-auto md:right-0 md:w-80">
                    {results.map((product: App.Data.ProductData) => (
                        <li
                            key={product.id}
                            className={cn('cursor-pointer px-4 py-2 hover:bg-gray-100', query === product.name && 'bg-gray-200')}
                            onClick={() => {
                                setIsDropdownOpen(false);
                                router.get(route('products.show', product.slug));
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-x-1">
                                    <img className="aspect-square size-12 rounded-md object-cover" src={product.cover?.original_url} alt={product.name} />
                                    <span className="text-sm">{product.name}</span>
                                </div>
                                <span className="font-semibold">${product.price}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductSearch;
