import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PaginatedData } from '@/app/types';
import { useTranslation } from 'react-i18next';
import ProductsList from './_partials/ProductsList';
import ProductsListFilters from './_partials/ProductsListFilters';

interface queryProps {
    attributes: never;
    variations: never;
    priceRange: number[] | never;
    search: string | number | never;
    selectedCategories: string[] | [];
}

const ProductsSearchPage = ({
    products,
    attributes,
    variations,
    query,
}: {
    products: PaginatedData<App.Data.ProductData>;
    attributes: App.Data.AttributeData[];
    variations: App.Data.VariationData[];
    query: queryProps;
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('products.products_search')} />

            <CategoriesSlider />

            <ProductsListFilters attributes={attributes} variations={variations} query={query} />

            <ProductsList products={products} />
        </>
    );
};

ProductsSearchPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default ProductsSearchPage;
