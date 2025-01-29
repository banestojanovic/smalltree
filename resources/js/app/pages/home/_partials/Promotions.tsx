import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import PromotionCard from '@/app/components/application/product/PomotionCard';
import { ProductQuickViewModal } from '@/app/components/application/product/ProductQuickViewModal';
import PromotionCardItem from '@/app/components/application/product/PromotionCardItem';
import { PageProps } from '@/app/types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Promotions = ({
    specialOffer,
    productOfTheMonth,
}: PageProps<{
    specialOffer: { title: string; subtitle: string; image: string; product: App.Data.ProductData };
    productOfTheMonth: { title: string; subtitle: string; image: string; product: App.Data.ProductData };
}>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 h-full overflow-hidden sm:mt-20">
            <div className="container">
                <div className="grid gap-4 md:grid-cols-12">
                    {productOfTheMonth && (
                        <motion.div
                            initial={{ x: `-20%` }}
                            whileInView={{ x: 0 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            className={`col-span-12 md:col-span-6 lg:col-span-5`}
                            viewport={{ once: true }}
                        >
                            <PromotionCard
                                title={productOfTheMonth?.title ?? t('homepage.promotions.tea_of_the_month')}
                                description={productOfTheMonth?.subtitle ?? t('homepage.promotions.tea_of_the_month_description')}
                                bgImageSrc={productOfTheMonth.image ?? ''}
                                cardClass={`rounded-lg overflow-hidden md:min-h-[436px]`}
                            >
                                <div className="mt-7 items-center justify-between md:mt-auto md:flex">
                                    <PromotionCardItem product={productOfTheMonth.product} />

                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex items-center justify-end"
                                    >
                                        {productOfTheMonth.product.variations && productOfTheMonth.product.variations.length > 0 ? (
                                            <ProductQuickViewModal product={productOfTheMonth.product} />
                                        ) : (
                                            <AddToCartButton variant="secondary" product={productOfTheMonth.product} productVariantId={null} />
                                        )}
                                    </motion.div>
                                </div>
                            </PromotionCard>
                        </motion.div>
                    )}

                    {specialOffer && (
                        <motion.div
                            initial={{ x: `20%` }}
                            whileInView={{ x: 0 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            viewport={{ once: true }}
                            className={`col-span-12 md:col-span-6 lg:col-span-7`}
                        >
                            <PromotionCard
                                title={specialOffer?.title ?? t('homepage.promotions.tea_of_the_month')}
                                description={specialOffer?.subtitle ?? t('homepage.promotions.tea_of_the_month_description')}
                                bgImageSrc={specialOffer.image ?? ''}
                                cardClass={`rounded-lg overflow-hidden md:min-h-[436px]`}
                            >
                                <div className="mt-7 items-center justify-between md:mt-auto md:flex">
                                    <PromotionCardItem product={specialOffer.product} />

                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex items-center justify-end"
                                    >
                                        {specialOffer.product.variations && specialOffer.product.variations.length > 0 ? (
                                            <ProductQuickViewModal product={specialOffer.product} />
                                        ) : (
                                            <AddToCartButton variant="secondary" product={specialOffer.product} productVariantId={null} />
                                        )}
                                    </motion.div>
                                </div>
                            </PromotionCard>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Promotions;
