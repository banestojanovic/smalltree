import { useEffect, useRef } from 'react';

import { Combobox, ComboboxItem } from '@/app/components/ui/combobox';
import { PageProps } from '@/app/types';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface queryProps {
    attributes: never;
    variations: never;
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

    const { data, setData, get } = useForm({
        attributes: attributes.reduce<Record<string, null>>((acc, attribute) => {
            acc[attribute.slug] = query.attributes?.[attribute.slug] ?? null;
            return acc;
        }, {}),
        variations: variations.reduce<Record<number, null>>((acc, variation) => {
            acc[variation.id] = query.variations?.[variation.id] ?? null;
            return acc;
        }, {}),
    });

    const handleSearch = () => {
        get(route('categories.show', category.slug), {
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
                            <div className={'flex flex-col space-y-1'} key={variation.id}>
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
                                    className='w-full'
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
                            <div className={'flex  flex-col space-y-1'} key={attribute.id}>
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
                                    className='w-full '
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

                    {/*<div className={'flex flex-col space-y-1'}>*/}
                    {/*    <span>{t('category_show.filters.origin_country')}</span>*/}
                    {/*    <Combobox*/}
                    {/*        value={selectedCountry}*/}
                    {/*        onChange={(value) => setSelectedCountry(value)}*/}
                    {/*        placeholder={t('category_show.filters.origin_country')}*/}
                    {/*        inputPlaceholder={t('category_show.filters.origin_country')}*/}
                    {/*    >*/}
                    {/*        <ComboboxItem value={null}>Select All</ComboboxItem>*/}
                    {/*        <ComboboxItem value="c1">County Value 1</ComboboxItem>*/}
                    {/*        <ComboboxItem value="c2">County Value 2</ComboboxItem>*/}
                    {/*        <ComboboxItem value="c3">County Value 3</ComboboxItem>*/}
                    {/*    </Combobox>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
};

export default ProductsListFilters;
