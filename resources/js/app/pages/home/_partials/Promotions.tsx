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
        <section className="mt-10 h-full sm:mt-20">
            <div className="container">
                <div className="grid gap-4 md:grid-cols-12">
                    {productOfTheMonth && (
                        <motion.div
                            initial={{ transform: `translateX(-20%)` }}
                            whileInView={{ transform: 'translateX(0)' }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`col-span-12 md:col-span-6 lg:col-span-5`}
                        >
                            <PromotionCard
                                title={productOfTheMonth?.title ?? t('homepage.promotions.tea_of_the_month')}
                                description={productOfTheMonth?.subtitle ?? t('homepage.promotions.tea_of_the_month_description')}
                                bgImageSrc={productOfTheMonth.image ?? ''}
                            >
                                <div className="mt-7 items-center justify-between md:mt-auto md:flex">
                                    <PromotionCardItem product={productOfTheMonth.product} />

                                    <div className="flex items-center justify-end">
                                        {productOfTheMonth.product.variations && productOfTheMonth.product.variations.length > 0 ? (
                                            <ProductQuickViewModal product={productOfTheMonth.product} />
                                        ) : (
                                            <AddToCartButton variant="secondary" product={productOfTheMonth.product} productVariantId={null} />
                                        )}
                                    </div>
                                </div>
                            </PromotionCard>
                        </motion.div>
                    )}

                    {specialOffer && (
                        <motion.div
                            initial={{ transform: `translateX(20%)` }}
                            whileInView={{ transform: 'translateX(0)' }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`col-span-12 md:col-span-6 lg:col-span-7`}
                        >
                            <PromotionCard
                                title={specialOffer?.title ?? t('homepage.promotions.tea_of_the_month')}
                                description={specialOffer?.subtitle ?? t('homepage.promotions.tea_of_the_month_description')}
                                bgImageSrc={specialOffer.image ?? ''}
                            >
                                <div className="mt-7 items-center justify-between md:mt-auto md:flex">
                                    <PromotionCardItem product={specialOffer.product} />

                                    <div className="flex items-center justify-end">
                                        {specialOffer.product.variations && specialOffer.product.variations.length > 0 ? (
                                            <ProductQuickViewModal product={specialOffer.product} />
                                        ) : (
                                            <AddToCartButton variant="secondary" product={specialOffer.product} productVariantId={null} />
                                        )}
                                    </div>
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
