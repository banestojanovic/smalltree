import { useEffect, useRef } from 'react';

import { PageProps } from '@/app/types';
import { useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { MultiSelect } from '@/app/components/ui/multi-select';
import { Slider } from '@/app/components/ui/slider';

interface queryProps {
    attributes: never;
    variations: never;
    priceRange: number[] | never;
    search: string | number | never;
    selectedCategories: string[] | [];
}

const ProductsListFilters = ({
    attributes,
    variations,
    query,
}: PageProps<{
    attributes: App.Data.AttributeData[];
    variations: App.Data.VariationData[];
    query: queryProps;
}>) => {
    const { t } = useTranslation();
    const categories = usePage<PageProps<{ global?: App.Data.GlobalData }>>().props.global?.categories;
    const formattedCategories =
        categories?.map((cat) => {
            return {
                value: cat.id.toString(),
                label: cat.name,
            };
        }) ?? [];

    const { data, setData, get } = useForm({
        attributes: attributes.reduce<Record<string, string[] | null>>((acc, attribute) => {
            acc[attribute.slug] = query.attributes?.[attribute.slug] ?? null;
            return acc;
        }, {}),
        variations: variations.reduce<Record<number, string[] | null>>((acc, variation) => {
            acc[variation.id] = query.variations?.[variation.id] ?? null;
            return acc;
        }, {}),
        priceRange: query.priceRange ?? null,
        search: query.search ?? null,
        selectedCategories: query.selectedCategories ?? [],
    });

    const handleValueChange = (newRange: number[]) => {
        setData('priceRange', newRange);
    };

    const handleSearch = () => {
        get(route('products.search-page'), {
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
        <section className="mt-10">
            <div className="container">
                <div className="flex w-full flex-wrap items-center gap-4">
                    <div>
                        <MultiSelect
                            options={formattedCategories}
                            onValueChange={(value) => setData('selectedCategories', value ?? [])}
                            defaultValue={data?.selectedCategories}
                            placeholder={t('filters.placeholders.categories')}
                        />
                    </div>

                    {variations.length > 0 &&
                        variations.map((variation) => (
                            <div key={variation.id}>
                                <MultiSelect
                                    options={
                                        variation?.values?.map((variation_value) => ({
                                            label: variation_value.value,
                                            value: variation_value.id.toString(),
                                        })) ?? []
                                    }
                                    onValueChange={(value: string[]) =>
                                        setData('variations', {
                                            ...data.variations,
                                            [variation.id]: value,
                                        })
                                    }
                                    defaultValue={data?.variations?.[variation.id] ?? undefined}
                                    placeholder={variation.name}
                                />
                            </div>
                        ))}

                    {attributes.length > 0 &&
                        attributes.map((attribute) => (
                            <div key={attribute.id}>
                                <MultiSelect
                                    options={
                                        attribute?.values?.map((attribute_value) => ({
                                            label: attribute_value.value,
                                            value: attribute_value.id.toString(),
                                        })) ?? []
                                    }
                                    onValueChange={(value: string[]) =>
                                        setData('attributes', {
                                            ...data.attributes,
                                            [attribute.slug]: value,
                                        })
                                    }
                                    defaultValue={data?.attributes?.[attribute.slug] ?? undefined}
                                    placeholder={attribute.name}
                                />
                            </div>
                        ))}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outlined-white" className={`h-12`}>
                                {t('filters.labels.price')}

                                {data.priceRange && data.priceRange?.length ? (
                                    <Badge variant="outline" className="border-none px-0 text-xs text-muted-foreground">
                                        ${data.priceRange[0] ?? 0} - ${data.priceRange[1] ?? 0}
                                    </Badge>
                                ) : (
                                    ''
                                )}

                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80">
                            <div className="p-3">
                                <h2 className="py-2 text-lg font-semibold">{t('filters.labels.price_range')}</h2>

                                <Button onClick={() => setData('priceRange', [])}>{t('filters.messages.clear')}</Button>

                                <div className="flex items-center justify-center">
                                    {data.priceRange && data.priceRange?.length ? (
                                        <Badge variant="outline" className="text-lg">
                                            ${data.priceRange[0] ?? 0} - ${data.priceRange[1] ?? 0}
                                        </Badge>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <Slider
                                    className="mt-4"
                                    defaultValue={query.priceRange ?? [0, 10000]}
                                    onValueCommit={handleValueChange}
                                    max={10000}
                                    min={0}
                                    minStepsBetweenThumbs={1}
                                    step={100}
                                    aria-label="Price range"
                                />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </section>
    );
};

export default ProductsListFilters;
