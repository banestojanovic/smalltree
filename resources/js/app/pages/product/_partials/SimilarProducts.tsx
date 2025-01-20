import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import ProductCard from '@/app/components/application/product/ProductCard';
import { Typography } from '@/app/components/ui/typography';
import { motion } from 'framer-motion';

const RelatedProducts = () => {
    const { t } = useTranslation();

    const { similarProducts } = usePage<{
        similarProducts: App.Data.ProductData[];
    }>().props;

    return similarProducts && similarProducts.length > 0 ? (
        <section className="mt-6 sm:mt-10">
            <div className="container">
                <div>
                    <motion.div initial={{ y: `-20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
                        <Typography as="h2">{t('product.similar_products.title')}</Typography>
                    </motion.div>
                    <motion.div initial={{ y: `20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
                        <Typography as="p" className="mt-3">
                            {t('product.similar_products.description')}
                        </Typography>
                    </motion.div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                    {similarProducts.map((product: App.Data.ProductData, index) => (
                        <motion.div key={product.id} initial={{ y: `${index + 50}px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: (index + 1) / 4 }} className={`flex`}>
                            <ProductCard product={product} key={product.id} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    ) : (
        <></>
    );
};

export default RelatedProducts;
