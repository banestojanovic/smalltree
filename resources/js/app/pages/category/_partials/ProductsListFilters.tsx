import { useEffect, useRef, useState } from 'react';

import { Combobox, ComboboxItem } from '@/app/components/ui/combobox';
import { PageProps } from '@/app/types';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Slider } from '@/app/components/ui/slider';
import { Filter } from 'lucide-react';

interface queryProps {
    attributes: never;
    variations: never;
    priceRange: number[] | never;
}

const ProductsListFilters = ({
    category,
    attributes,
    variations,
    query,
}: PageProps<{
    category: App.Data.CategoryData;
    attributes: App.Data.AttributeData[];
    variations: App.Data.VariationData[];
    query: queryProps;
}>) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const { data, setData, get } = useForm({
        attributes: attributes.reduce<Record<string, null>>((acc, attribute) => {
            acc[attribute.slug] = query.attributes?.[attribute.slug] ?? null;
            return acc;
        }, {}),
        variations: variations.reduce<Record<number, null>>((acc, variation) => {
            acc[variation.id] = query.variations?.[variation.id] ?? null;
            return acc;
        }, {}),
        priceRange: query.priceRange ?? null,
    });

    const handleValueChange = (newRange: number[]) => {
        setData('priceRange', newRange);
        setOpen(false);
    };

    const handleSearch = () => {
        get(route('categories.show', category.slug), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const prevData = useRef(data);

    useEffect(() => {
        if (JSON.stringify(prevData.current) !== JSON.stringify(data)) {
            handleSearch();
            prevData.current = data;
        }
    }, [data]);

    return (
        <>
            <section className="mt-10 hidden md:block">
                <div className="container">
                    <div className="flex w-full flex-wrap items-center gap-7">
                        {variations.length > 0 &&
                            variations.map((variation) => (
                                <div className={''} key={variation.id}>
                                    <Combobox
                                        value={data.variations[variation.id]}
                                        onChange={(value) =>
                                            setData('variations', {
                                                ...data.variations,
                                                [variation.id]: value,
                                            })
                                        }
                                        placeholder={variation.name}
                                        inputPlaceholder={variation.name}
                                        className=""
                                    >
                                        <ComboboxItem value={null}>{t('category_show.filters.not_selected')}</ComboboxItem>

                                        {variation?.values?.map((variation_value) => (
                                            <ComboboxItem value={variation_value.id.toString()} key={variation_value.id}>
                                                {variation_value.value}
                                            </ComboboxItem>
                                        ))}
                                    </Combobox>
                                </div>
                            ))}

                        {attributes.length > 0 &&
                            attributes.map((attribute) => (
                                <div className={''} key={attribute.id}>
                                    <Combobox
                                        value={data.attributes[attribute.slug]}
                                        onChange={(value) =>
                                            setData('attributes', {
                                                ...data.attributes,
                                                [attribute.slug]: value,
                                            })
                                        }
                                        placeholder={attribute.name}
                                        inputPlaceholder={attribute.name}
                                        className=""
                                    >
                                        <ComboboxItem value={null}>{t('category_show.filters.not_selected')}</ComboboxItem>

                                        {attribute?.values?.map((attribute_value) => (
                                            <ComboboxItem value={attribute_value.id.toString()} key={attribute_value.id}>
                                                {attribute_value.value}
                                            </ComboboxItem>
                                        ))}
                                    </Combobox>
                                </div>
                            ))}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline-white" className="w-[200px] !justify-between py-5">
                                    Price
                                    <span className="opacity-50">
                                        <svg width="5" height="4" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.85 5.55L0 0.700001L0.7 0L4.85 4.15L9 0L9.7 0.700001L4.85 5.55Z" fill="black" />
                                        </svg>
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80">
                                <div className="p-3">
                                    <h2 className="py-2 text-lg font-semibold">Price Range</h2>

                                    <Button onClick={() => setData('priceRange', [])}>Clear</Button>

                                    <div className="flex items-center justify-center">
                                        {data.priceRange && data.priceRange?.length && (
                                            <Badge variant="outline" className="text-lg">
                                                ${data.priceRange[0] ?? 0} - ${data.priceRange[1] ?? 0}
                                            </Badge>
                                        )}
                                    </div>
                                    <Slider className="mt-4" defaultValue={query.priceRange ?? [0, 10000]} onValueCommit={handleValueChange} max={10000} min={0} step={10} aria-label="Price range" />
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </section>

            <section className="container flex items-center justify-end md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button size="circle" variant="outline">
                            <Filter />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{t('Filter products')}</SheetTitle>
                        </SheetHeader>
                        <SheetDescription className="sr-only">Filter products</SheetDescription>
                        <div className="mt-7 flex w-full flex-col gap-7 px-4">
                            {variations.length > 0 &&
                                variations.map((variation) => (
                                    <div className={''} key={variation.id * Math.random()}>
                                        <Combobox
                                            value={data.variations[variation.id]}
                                            onChange={(value) =>
                                                setData('variations', {
                                                    ...data.variations,
                                                    [variation.id]: value,
                                                })
                                            }
                                            placeholder={variation.name}
                                            inputPlaceholder={variation.name}
                                            className="w-full"
                                        >
                                            <ComboboxItem value={null}>{t('category_show.filters.not_selected')}</ComboboxItem>

                                            {variation?.values?.map((variation_value) => (
                                                <ComboboxItem value={variation_value.id.toString()} key={variation_value.id}>
                                                    {variation_value.value}
                                                </ComboboxItem>
                                            ))}
                                        </Combobox>
                                    </div>
                                ))}

                            {attributes.length > 0 &&
                                attributes.map((attribute) => (
                                    <div className={''} key={attribute.id * Math.random()}>
                                        <Combobox
                                            value={data.attributes[attribute.slug]}
                                            onChange={(value) =>
                                                setData('attributes', {
                                                    ...data.attributes,
                                                    [attribute.slug]: value,
                                                })
                                            }
                                            placeholder={attribute.name}
                                            inputPlaceholder={attribute.name}
                                            className="w-full"
                                        >
                                            <ComboboxItem value={null}>{t('category_show.filters.not_selected')}</ComboboxItem>

                                            {attribute?.values?.map((attribute_value) => (
                                                <ComboboxItem value={attribute_value.id.toString()} key={attribute_value.id}>
                                                    {attribute_value.value}
                                                </ComboboxItem>
                                            ))}
                                        </Combobox>
                                    </div>
                                ))}

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline-white" className="!justify-between py-5">
                                        Price
                                        <span className="opacity-50">
                                            <svg width="5" height="4" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.85 5.55L0 0.700001L0.7 0L4.85 4.15L9 0L9.7 0.700001L4.85 5.55Z" fill="black" />
                                            </svg>
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-80">
                                    <div className="p-3">
                                        <h2 className="py-2 text-lg font-semibold">Price Range</h2>

                                        <Button onClick={() => setData('priceRange', [])}>Clear</Button>

                                        <div className="flex items-center justify-center">
                                            {data.priceRange && data.priceRange?.length && (
                                                <Badge variant="outline" className="text-lg">
                                                    ${data.priceRange[0] ?? 0} - ${data.priceRange[1] ?? 0}
                                                </Badge>
                                            )}
                                        </div>
                                        <Slider
                                            className="mt-4"
                                            defaultValue={query.priceRange ?? [0, 10000]}
                                            onValueCommit={handleValueChange}
                                            max={10000}
                                            min={0}
                                            step={10}
                                            aria-label="Price range"
                                        />
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SheetContent>
                </Sheet>
            </section>
        </>
    );
};

export default ProductsListFilters;
