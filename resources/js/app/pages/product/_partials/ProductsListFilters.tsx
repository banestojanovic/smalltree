import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { MultiSelect } from '@/app/components/ui/multi-select';
import { Slider } from '@/app/components/ui/slider';
import { PageProps } from '@/app/types';
import useNumberFormatter from '@/functions';
import { useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface queryProps {
    attributes: never;
    variations: never;
    priceRange: number[] | never;
    search: string | number | never;
    selectedCategories: string[] | [];
    selectedTypes: string[] | [];
    contains: Record<string, string[] | null>;
}

interface PageDataProps {
    slug?: string;
}

const ProductsListFilters = ({
    pageData,
    attributes,
    radioAttributes,
    variations,
    types,
    query,
}: PageProps<{
    pageData: PageDataProps;
    attributes: App.Data.AttributeData[];
    radioAttributes: App.Data.AttributeData[];
    variations: App.Data.VariationData[];
    types: App.Data.ProductTypeData[];
    query: queryProps;
}>) => {
    const [rangeMenuOpen, setRangeMenuOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const categories = usePage<PageProps<{ global?: App.Data.GlobalData }>>().props.global?.categories;

    const formatNumber = useNumberFormatter();

    const formattedTypes =
        types?.map((cat) => {
            return {
                value: cat.id.toString(),
                label: cat.name,
            };
        }) ?? [];

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
        contains: radioAttributes.reduce<Record<string, string[] | null>>((acc, attribute) => {
            acc[attribute.slug] = query.contains?.[attribute.slug] ?? null;
            return acc;
        }, {}),
        priceRange: query.priceRange ?? null,
        search: query.search ?? null,
        selectedTypes: query.selectedTypes ?? [],
        selectedCategories: query.selectedCategories ?? [],
    });

    const handleValueChange = (newRange: number[]) => {
        setData('priceRange', newRange);
    };

    const handleSearch = () => {
        get(route().current() === 'categories.show' && pageData?.slug ? route('categories.show', { category: pageData.slug }) : route('search.show'), {
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
                    {route().current() !== 'categories.show' && (
                        <motion.div initial={{ x: `50px` }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: 0.2 }} viewport={{ once: true }}>
                            <MultiSelect
                                options={formattedTypes}
                                onValueChange={(value) => setData('selectedTypes', value ?? [])}
                                defaultValue={data?.selectedTypes}
                                placeholder={t('filters.placeholders.types')}
                            />
                        </motion.div>
                    )}

                    {route().current() !== 'categories.show' && (
                        <motion.div initial={{ x: `50px` }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: 0.5 }} viewport={{ once: true }}>
                            <MultiSelect
                                options={formattedCategories}
                                onValueChange={(value) => setData('selectedCategories', value ?? [])}
                                defaultValue={data?.selectedCategories}
                                placeholder={t('filters.placeholders.categories')}
                            />
                        </motion.div>
                    )}

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
                        attributes.map((attribute, index) => (
                            <motion.div key={attribute.id} initial={{ x: `50px` }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: (index + 3) / 4 }} viewport={{ once: true }}>
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
                            </motion.div>
                        ))}

                    {radioAttributes.length > 0 &&
                        radioAttributes.map((attribute, index) =>
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            (attribute?.searchType && data.selectedTypes?.includes(attribute.searchType)) || data.selectedTypes?.length < 1 ? (
                                <motion.div key={attribute.id} initial={{ x: `50px` }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: (index + 3) / 4 }} viewport={{ once: true }}>
                                    <Button
                                        variant={`outlined-white`}
                                        className={`h-12 space-x-4`}
                                        onClick={() => {
                                            const currentValue = data.contains[attribute.slug];
                                            setData('contains', {
                                                ...data.contains,
                                                [attribute.slug]: currentValue?.length ? [] : attribute?.values?.[0]?.id ? [attribute.values[0].id.toString()] : null,
                                            });
                                        }}
                                    >
                                        <span>{attribute?.searchLabel ?? attribute.name}</span>

                                        <span className={`border-foreground/40 relative inline-flex size-5 items-center justify-between rounded-full border p-0.5`}>
                                            {data.contains?.[attribute.slug]?.[0] ? <span className={`bg-primary absolute left-px inline-flex size-4 shrink-0 rounded-full`}></span> : ''}
                                        </span>
                                    </Button>
                                </motion.div>
                            ) : (
                                ''
                            ),
                        )}

                    <motion.div initial={{ x: `50px` }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: 1.2 }} viewport={{ once: true }}>
                        <DropdownMenu open={rangeMenuOpen} onOpenChange={setRangeMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outlined-white" className={`h-12`} onClick={() => setRangeMenuOpen(true)}>
                                    {t('filters.labels.price')}

                                    {data.priceRange && data.priceRange?.length ? (
                                        <Badge variant="outline" className="text-muted-foreground border-none px-0 text-xs">
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
                            <DropdownMenuContent className="min-w-80">
                                <div className="p-3">
                                    <div className={`flex justify-between`}>
                                        <h2 className="font-title mb-4 text-lg font-semibold">{t('filters.labels.price_range')}</h2>

                                        <Button
                                            variant={`link`}
                                            size={`circle`}
                                            className={`text-muted-foreground hover:text-foreground mr-2 underline`}
                                            onClick={() => {
                                                setData('priceRange', []);
                                                setRangeMenuOpen(false);
                                            }}
                                        >
                                            <span className="">{t('filters.messages.reset')}</span>
                                        </Button>
                                    </div>
                                    <div className={`text-muted-foreground flex flex-col space-y-2.5`}>
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

                                        <div className="flex items-center justify-between text-sm">
                                            <span>{formatNumber(data?.priceRange?.[0] ?? 0)}rsd</span>
                                            <span>{formatNumber(data?.priceRange?.[1] ?? 10000)}rsd</span>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductsListFilters;
