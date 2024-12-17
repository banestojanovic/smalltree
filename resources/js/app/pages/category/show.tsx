import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import TeaRituals from '@/app/components/application/TeaRituals';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import CategoryDetails from '@/app/pages/category/_partials/CategoryDetails';
import ProductsListFilters from '@/app/pages/category/_partials/ProductsListFilters';
import { PaginatedData } from '@/app/types';
import RelatedProducts from './_partials/RelatedProducts';

const CategoryShowPage = ({ category, products }: { category: App.Data.CategoryData; products: PaginatedData<App.Data.ProductData> }) => {
    return (
        <>
            <Head title={category.name} />

            <CategoriesSlider />

            <CategoryDetails />

            <ProductsListFilters />

            <RelatedProducts products={products} />

            <TeaRituals />
        </>
    );
};

CategoryShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default CategoryShowPage;
