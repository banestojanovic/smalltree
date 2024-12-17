import { Button } from '@/app/components/ui/button';
import { useTranslation } from 'react-i18next';

import ProductCard from '@/app/components/application/product/ProductCard';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';

const PopularProducts = ({ products }: PageProps<{ products?: App.Data.ProductData[] }>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                <Typography as="h2">{t('enums.homepage.sections.most_popular_tea')}</Typography>

                <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products && products.length > 0 ? (
                        products.map((product) => <ProductCard product={product} key={product.id} />)
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">{t('enums.product.no_products_available')}.</p>
                    )}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <Button>{t('enums.homepage.sections.see_all')}</Button>
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;
