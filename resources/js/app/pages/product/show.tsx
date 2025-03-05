import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductDetails from '@/app/pages/product/_partials/ProductDetails';
import SimilarProducts from '@/app/pages/product/_partials/SimilarProducts';
import { PageProps } from '@/app/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

const ProductShowPage = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    return (
        <>
            <Head>
                <title>{product.name}</title>

                <meta name="description" content={product.description ?? 'Default description'} />
                <meta name="keywords" content={`${product.name}, čajevi, pokloni, poruči, kupi`} />
                <meta name="robots" content="index, follow" />

                <link rel="canonical" href={route('products.show', product.slug)} />

                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product?.description ?? 'Default description'} />
                <meta property="og:url" content={route('products.show', product.slug)} />
                <meta property="og:type" content="product" />
                <meta property="og:image" content={product?.cover?.original_url} />
                <meta property="og:price:amount" content={product.price?.toString()} />
                <meta property="og:price:currency" content="RSD" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product.name} />
                <meta name="twitter:description" content={product.description ?? 'Default description'} />
                <meta name="twitter:image" content={product?.cover?.original_url} />
            </Head>

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
