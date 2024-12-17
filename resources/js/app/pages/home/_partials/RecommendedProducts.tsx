import { Button } from '@/app/components/ui/button';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import ProductCard from '@/app/components/application/product/ProductCard';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';

const RecommendedProducts = () => {
    const { t } = useTranslation();
    const {
        staffRecommendedProducts,
    }: PageProps<{ staffRecommendedProducts?: App.Data.ProductData[] }> =
        usePage().props;

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                <Typography as="h2">
                    {t('enums.homepage.sections.staff_recommended')}
                </Typography>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {staffRecommendedProducts &&
                    staffRecommendedProducts.length > 0 ? (
                        staffRecommendedProducts.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            {t('enums.product.no_products_available')}.
                        </p>
                    )}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <Button>{t('enums.homepage.sections.see_all')}</Button>
                </div>
            </div>
        </section>
    );
};

export default RecommendedProducts;
