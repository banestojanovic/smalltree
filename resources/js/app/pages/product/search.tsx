import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import { Typography } from '@/app/components/ui/typography';
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
    selectedTypes: string[] | [];
}

interface PageDataProps {
    title?: string;
    description?: string;
    slug?: string;
}

const ProductsSearchPage = ({
    pageData,
    products,
    attributes,
    variations,
    types,
    query,
}: {
    pageData: PageDataProps;
    products: PaginatedData<App.Data.ProductData>;
    attributes: App.Data.AttributeData[];
    variations: App.Data.VariationData[];
    types: App.Data.ProductTypeData[];
    query: queryProps;
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('products.products_search')} />

            <CategoriesSlider />

            {pageData?.title || pageData?.description ? (
                <section className="mt-5 sm:mt-10">
                    <div className="container mx-auto">
                        {pageData?.title && <Typography as="h2">{pageData.title}</Typography>}
                        {pageData?.description && (
                            <Typography as="p" className="mt-3">
                                {pageData.description}
                            </Typography>
                        )}
                    </div>
                </section>
            ) : (
                ''
            )}

            <ProductsListFilters pageData={pageData} attributes={attributes} variations={variations} types={types} query={query} />

            <ProductsList products={products} />
        </>
    );
};

ProductsSearchPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default ProductsSearchPage;
