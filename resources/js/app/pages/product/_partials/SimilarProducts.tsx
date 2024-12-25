import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import ProductCard from '@/app/components/application/product/ProductCard';
import { Typography } from '@/app/components/ui/typography';

const RelatedProducts = () => {
    const { t } = useTranslation();

    const { similarProducts } = usePage<{
        similarProducts: App.Data.ProductData[];
    }>().props;

    return (
        <section className="mt-10">
            <div className="container">
                <Typography as="h3">{t('enums.product.similar_products')}</Typography>

                <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {similarProducts && similarProducts.length > 0 ? (
                        similarProducts.map((product: App.Data.ProductData) => <ProductCard product={product} key={product.id} />)
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">{t('enums.product.no_products_available')}.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
