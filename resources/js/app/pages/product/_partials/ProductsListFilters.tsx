import { useEffect, useRef, useState } from 'react';

import { Combobox, ComboboxItem } from '@/app/components/ui/combobox';
import { PageProps } from '@/app/types';
import { useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { MultiSelect } from '@/app/components/ui/multi-select';
import { Slider } from '@/app/components/ui/slider';
import { ChevronsUpDown } from 'lucide-react';

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
    const formattedCategories = categories?.map((cat) => {
        return {
            value: cat.id,
            label: cat.name,
        };
    });

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
        search: query.search ?? null,
        selectedCategories: query.selectedCategories ?? [],
    });

    // Initial price range values
    const [range, setRange] = useState<number[]>([10, 10000]);

    const handleValueChange = (newRange: number[]) => {
        setRange(newRange);
        setData('priceRange', newRange);
    };

    const handleSearch = () => {
        get(route('products.search-page'), {
            preserveScroll: true,
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
                <div className="flex w-full flex-wrap items-center gap-7">

                    {variations.length > 0 &&
                        variations.map((variation) => (
                            <div key={variation.id}>
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
                            <Button variant="outline">
                                Price
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80">
                            <div className="p-3">
                                <h2 className="py-2 text-lg font-semibold">Price Range</h2>

                                <Button onClick={() => setData('priceRange', [])}>Clear</Button>

                                <p className="flex items-center justify-center">
                                    {data.priceRange && data.priceRange?.length && (
                                        <Badge variant="outline" className="text-lg">
                                            ${data.priceRange[0] ?? 0} - ${data.priceRange[1] ?? 0}
                                        </Badge>
                                    )}
                                </p>
                                <Slider className="mt-4" value={range} onValueChange={handleValueChange} max={10000}
                                        min={0} step={10} aria-label="Price range" />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <div>
                        <MultiSelect
                            options={formattedCategories}
                            onValueChange={(value) => setData('selectedCategories', value ?? [])}
                            defaultValue={data?.selectedCategories}
                            placeholder="Select Categories"
                            variant="inverted"
                            animation={2}
                            maxCount={3}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProductsListFilters;
