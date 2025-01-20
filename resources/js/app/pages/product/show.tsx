import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductDetails from '@/app/pages/product/_partials/ProductDetails';
import SimilarProducts from '@/app/pages/product/_partials/SimilarProducts';
import { PageProps } from '@/app/types';

const ProductShowPage = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    return (
        <>
            <Head title={product.name} />

            <div className={`py-8 lg:py-16`}>
                <ProductDetails product={product} />
            </div>

            <div>
                <SimilarProducts />
            </div>
        </>
    );
};

ProductShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default ProductShowPage;
