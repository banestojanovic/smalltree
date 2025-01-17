import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import CategoryDetails from '@/app/pages/category/_partials/CategoryDetails';
import ProductsListFilters from '@/app/pages/category/_partials/ProductsListFilters';
import { PaginatedData } from '@/app/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import RelatedProducts from './_partials/RelatedProducts';

interface queryProps {
    attributes: never;
    variations: never;
    priceRange: number[] | never;
}

const CategoryShowPage = ({
    category,
    products,
    attributes,
    variations,
    promotionProduct,
    query,
}: {
    category: App.Data.CategoryData;
    products: PaginatedData<App.Data.ProductData>;
    attributes: App.Data.AttributeData[];
    variations: App.Data.VariationData[];
    promotionProduct: App.Data.ProductData;
    query: queryProps;
}) => {
    return (
        <>
            <Head title={category.name} />

            <CategoriesSlider />

            <CategoryDetails />

            <ProductsListFilters category={category} attributes={attributes} variations={variations} query={query} />

            <RelatedProducts products={products} promotionProduct={promotionProduct} />
        </>
    );
};

CategoryShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default CategoryShowPage;
