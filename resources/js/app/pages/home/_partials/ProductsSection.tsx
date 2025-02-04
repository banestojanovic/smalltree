import ProductCard from '@/app/components/application/product/ProductCard';
import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ProductsSection = ({
    products,
    title,
    subtitle,
    action,
}: PageProps<{
    products?: App.Data.ProductData[];
    title?: string | null;
    subtitle?: string | null;
    action?: { title: string; link: string } | null;
}>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                {title && (
                    <Typography as="h2" className={`sm:text-3xl`}>
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography as="p" className={`text-foreground/80 mt-2 leading-normal sm:mt-4`}>
                        {subtitle}
                    </Typography>
                )}

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ y: `${index + 50}px` }}
                                whileInView={{ y: 0 }}
                                transition={{ type: 'spring', duration: (index + 1) / 5 }}
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

                {action && action?.title && action?.link && (
                    <div className="mt-10 flex items-center justify-center">
                        <Button asChild className="h-12 px-10">
                            <Link href={action.link}>{action.title}</Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};
export default ProductsSection;
