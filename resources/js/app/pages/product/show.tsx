import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductDetails from '@/app/pages/product/_partials/ProductDetails';
import { Separator } from '@/app/components/ui/separator';
import SimilarProducts from '@/app/pages/product/_partials/SimilarProducts';

const ProductShowPage = () => {
    const { product } = usePage<{
        product: App.Data.CategoryData;
    }>().props;

    return (
        <>
            <Head title={product.name} />

            <ProductDetails />

            <Separator className='my-7' />

            <SimilarProducts />
        </>
    );
};

ProductShowPage.layout = (page: ReactNode) => (
    <FrontendLayout>{page}</FrontendLayout>
);

export default ProductShowPage;
