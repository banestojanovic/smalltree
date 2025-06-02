import PromotionCard from '@/app/components/application/product/PomotionCard';
import PromotionCardItem from '@/app/components/application/product/PromotionCardItem';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Promotions = ({
    newProducts,
    specialOffer,
    productOfTheMonth,
}: PageProps<{
    newProducts: { title: string; subtitle: string; image: string; products: App.Data.ProductData[] };
    specialOffer: { title: string; subtitle: string; image: string; products: App.Data.ProductData[] };
    productOfTheMonth: { title: string; subtitle: string; image: string; products: App.Data.ProductData[] };
}>) => {
    const { t } = useTranslation();

    console.log(specialOffer);
    return (
        <section className="mt-10 h-full overflow-hidden sm:mt-20">
            <div className="container">
                <div className="grid gap-4 md:grid-cols-12">
                    {newProducts && (
                        <motion.div
                            initial={{ x: `-20%` }}
                            whileInView={{ x: 0 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            className={`col-span-12 md:col-span-6 lg:col-span-5`}
                            viewport={{ once: true }}
                        >
                            <Link href={route('search.custom', { custom: 'novo' })}>
                                <PromotionCard
                                    title={newProducts?.title ?? t('homepage.promotions.tea_of_the_month')}
                                    description={newProducts?.subtitle ?? t('homepage.promotions.tea_of_the_month_description')}
                                    bgImageSrc={newProducts.image ?? ''}
                                    cardClass={`rounded-lg overflow-hidden md:min-h-[436px]`}
                                >
                                    <div className="mt-7 flex flex-col space-y-2 md:mt-auto">
                                        {newProducts.products.map((product) => (
                                            <PromotionCardItem key={product?.id} product={product} />
                                        ))}
                                    </div>
                                </PromotionCard>
                            </Link>
                        </motion.div>
                    )}

                    {productOfTheMonth && (
                        <motion.div
                            initial={{ x: `20%` }}
                            whileInView={{ x: 0 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            viewport={{ once: true }}
                            className={`col-span-12 md:col-span-6 lg:col-span-7`}
                        >
                            <Link href={route('search.custom', { custom: 'smalltree-preporuka' })}>
                                <PromotionCard
                                    title={productOfTheMonth?.title ?? t('homepage.promotions.tea_of_the_month')}
                                    description={productOfTheMonth?.subtitle ?? t('homepage.promotions.tea_of_the_month_description')}
                                    bgImageSrc={productOfTheMonth.image ?? ''}
                                    cardClass={`rounded-lg overflow-hidden md:min-h-[436px]`}
                                >
                                    <div className="mt-7 flex flex-col space-y-2 md:mt-auto">
                                        {productOfTheMonth.products.map((product) => (
                                            <PromotionCardItem key={product?.id} product={product} />
                                        ))}
                                    </div>
                                </PromotionCard>
                            </Link>
                        </motion.div>
                    )}

                    {specialOffer && (
                        <motion.div initial={{ y: `20%` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} className={`col-span-12`} viewport={{ once: true }}>
                            <Link href={route('search.custom', { custom: 'najpopularniji' })}>
                                <PromotionCard
                                    title={specialOffer?.title ?? t('homepage.promotions.tea_of_the_month')}
                                    description={specialOffer?.subtitle ?? t('homepage.promotions.tea_of_the_month_description')}
                                    bgImageSrc={specialOffer.image ?? ''}
                                    cardClass={`rounded-lg overflow-hidden h-[410px] md:min-h-[436px]`}
                                >
                                    <div className="mt-7 grid gap-2 md:mt-auto md:grid-cols-3">
                                        {specialOffer.products.map((product) => (
                                            <PromotionCardItem key={product?.id} product={product} />
                                        ))}
                                    </div>
                                </PromotionCard>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Promotions;
