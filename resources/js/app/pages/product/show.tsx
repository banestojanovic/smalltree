import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Separator } from '@/app/components/ui/separator';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductDetails from '@/app/pages/product/_partials/ProductDetails';
import SimilarProducts from '@/app/pages/product/_partials/SimilarProducts';
import { PageProps } from '@/app/types';

const ProductShowPage = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    return (
        <>
            <Head title={product.name} />

            <ProductDetails product={product} />

            <Separator className="my-7 hidden lg:block" />

            <SimilarProducts />
        </>
    );
};

ProductShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default ProductShowPage;
