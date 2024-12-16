import { usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Combobox } from '@/app/components/ui/combobox';
import { PageProps } from '@/app/types';
import { useTranslation } from 'react-i18next';

const ProductsListFilters = () => {
    const { t } = useTranslation();


    const [selectedVariety, setSelectedVariety] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedTaste, setSelectedTaste] = useState('');

    const teaVarieties = [
        { value: '1', label: 'Variety 1' },
        { value: '2', label: 'Variety 2' },
    ];

    const countries = [
        { value: 'C1', label: 'Country 1' },
        { value: 'C2', label: 'Country 2' },
    ];

    const teaTastes = [
        { value: 't1', label: 'Taste 1' },
        { value: 't2', label: 'Taste 2' },
    ];

    return (
        <section className="mt-10">
            <div className="container">
                <div className="flex flex-wrap items-center gap-7">
                    <Combobox
                        options={teaVarieties}
                        value={selectedVariety}
                        onChange={setSelectedVariety}
                        placeholder={t(
                            'enums.category_show.filters.tea_variety',
                        )}
                        inputPlaceholder={t(
                            'enums.category_show.filters.tea_variety',
                        )}
                    />

                    <Combobox
                        options={countries}
                        value={selectedCountry}
                        onChange={setSelectedCountry}
                        placeholder={t(
                            'enums.category_show.filters.origin_country',
                        )}
                        inputPlaceholder={t(
                            'enums.category_show.filters.origin_country',
                        )}
                    />

                    <Combobox
                        options={teaTastes}
                        value={selectedTaste}
                        onChange={setSelectedTaste}
                        placeholder={t('enums.category_show.filters.tea_taste')}
                        inputPlaceholder={t(
                            'enums.category_show.filters.tea_taste',
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductsListFilters;
