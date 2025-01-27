import ProductCard from '@/app/components/application/product/ProductCard';
import Pagination from '@/app/components/ui/pagination';
import { PaginatedData } from '@/app/types';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductsList = ({ products }: { products: PaginatedData<App.Data.ProductData> }) => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleFinish = () => setIsLoading(false);

        router.on('start', handleStart);
        router.on('finish', handleFinish);
    }, []);

    return (
        products && (
            <section className="mt-10">
                <div className="container">
                    {products.data && products.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.data.map((product: App.Data.ProductData, index) => (
                                <motion.article
                                    key={product.id}
                                    initial={{ y: `${index + 50}px` }}
                                    animate={{ y: 0 }}
                                    transition={{ type: 'spring', duration: (index + 1) / 4 }}
                                    className={`relative flex ${isLoading ? 'animate-pulse' : ''}`}
                                >
                                    <>
                                        {isLoading && <span className="bg-background/40 absolute inset-0 z-20 size-full" />}
                                        <ProductCard product={product} />
                                    </>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className={`space-y-2`}>
                            <div className="font-title w-full text-2xl">{t('search.no_results')}.</div>
                            <p className={`leading-normal`}>{t('search.no_results_message')}</p>
                        </div>
                    )}

                    <div className="mt-10 flex items-center justify-center">
                        <Pagination links={products.links} />
                    </div>
                </div>
            </section>
        )
    );
};

export default ProductsList;
