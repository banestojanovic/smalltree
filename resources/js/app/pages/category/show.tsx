import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import TeaRituals from '@/app/components/application/TeaRituals';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import CategoryDetails from '@/app/pages/category/_partials/CategoryDetails';
import ProductsListFilters from '@/app/pages/category/_partials/ProductsListFilters';
import RelatedProducts from './_partials/RelatedProducts';

const CategoryShowPage = () => {
    const { category } = usePage<{
        category: App.Data.CategoryData;
    }>().props;

    return (
        <>
            <Head title={category.name} />

            <CategoriesSlider />

            <CategoryDetails />

            <ProductsListFilters />

            <RelatedProducts />

            <TeaRituals />
        </>
    );
};

CategoryShowPage.layout = (page: ReactNode) => (
    <FrontendLayout>{page}</FrontendLayout>
);

export default CategoryShowPage;
