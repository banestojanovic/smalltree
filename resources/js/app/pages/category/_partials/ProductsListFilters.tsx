import { useEffect, useState } from 'react';

import { Combobox, ComboboxItem } from '@/app/components/ui/combobox';
import { PageProps } from '@/app/types';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface queryProps {
    selectedVariation: string | number | null;
}

const ProductsListFilters = ({
    category,
    variations,
    query,
}: PageProps<{
    category: App.Data.CategoryData;
    variations: App.Data.ProductVariationData[];
    query: queryProps;
}>) => {
    const { t } = useTranslation();

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedTaste, setSelectedTaste] = useState('');

    const { data, setData, get, processing, errors, reset } = useForm({
        selectedVariation: query?.selectedVariation ?? null,
    });

    console.log(query);

    // track initial load
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (isInitialLoad) {
            // Skip calling handleSearch on the initial load
            setIsInitialLoad(false);
        } else {
            // Trigger handleSearch only after the initial load
            handleSearch();
        }
    }, [data.selectedVariation]);

    const handleSearch = () => {
        get(route('categories.show', category.slug), {
            // onFinish: () => reset('selectedVariation'),
        });
    };

    return (
        <section className="mt-10">
            <div className="container">
                <div className="flex flex-wrap items-center gap-7">
                    <Combobox
                        value={data?.selectedVariation}
                        onChange={(value) => setData('selectedVariation', value)}
                        placeholder={t('enums.product.variations')}
                        inputPlaceholder={t('enums.product.variations')}
                    >
                        <ComboboxItem value={null}>Select All</ComboboxItem>

                        {variations.map((variation) => (
                            <ComboboxItem value={variation.id} key={variation.id}>
                                {variation.sku} - {variation.id}
                            </ComboboxItem>
                        ))}
                    </Combobox>

                    <Combobox
                        value={selectedCountry}
                        onChange={(value) => setSelectedCountry(value)}
                        placeholder={t('enums.product.origin_country')}
                        inputPlaceholder={t('enums.product.origin_country')}
                    >
                        <ComboboxItem value={null}>Select All</ComboboxItem>
                        <ComboboxItem value="c1">County Value 1</ComboboxItem>
                        <ComboboxItem value="c2">County Value 2</ComboboxItem>
                        <ComboboxItem value="c3">County Value 3</ComboboxItem>
                    </Combobox>

                    <Combobox value={selectedTaste} onChange={(value) => setSelectedTaste(value)} placeholder={t('enums.product.tea_taste')} inputPlaceholder={t('enums.product.tea_taste')}>
                        <ComboboxItem value={null}>Select All</ComboboxItem>
                        <ComboboxItem value="t1">Taste Value 1</ComboboxItem>
                        <ComboboxItem value="t2">Taste Value 2</ComboboxItem>
                        <ComboboxItem value="t3">Taste Value 3</ComboboxItem>
                    </Combobox>
                </div>
            </div>
        </section>
    );
};

export default ProductsListFilters;
