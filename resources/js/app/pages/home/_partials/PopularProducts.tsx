import ProductCard from '@/app/components/application/product/ProductCard';
import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PopularProducts = ({ products }: PageProps<{ products?: App.Data.ProductData[] }>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                <Typography as="h2" className={`sm:text-3xl`}>
                    {t('homepage.sections.most_popular.title')}
                </Typography>
                <Typography as="p" className={`mt-2 text-sm leading-normal text-foreground/80 sm:mt-4`}>
                    {t('homepage.sections.most_popular.subtitle')}
                </Typography>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ transform: `translateY(${index + 50})` }}
                                whileInView={{ transform: 'translateY(0px)' }}
                                transition={{ type: 'spring', duration: (index + 1) / 4 }}
                                viewport={{ once: true }}
                                className={`flex`}
                            >
                                <ProductCard product={product} key={product.id} />
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">{t('product.no_products_available')}.</p>
                    )}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <Button className="!px-10">{t('homepage.sections.see_all')}</Button>
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;
