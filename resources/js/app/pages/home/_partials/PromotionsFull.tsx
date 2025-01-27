import AddGroupedProductsToCartButton from '@/app/components/application/product/AddGroupedProductsToCartButton';
import PromotionCard from '@/app/components/application/product/PomotionCard';
import PromotionCardItem from '@/app/components/application/product/PromotionCardItem';
import { PageProps } from '@/app/types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Promotions = ({
    promoPackages,
}: PageProps<{
    promoPackages?: {
        title: Record<string, string>;
        subtitle: Record<string, string>;
        bg_image: string;
        products: App.Data.ProductData[];
    }[];
}>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 h-full overflow-hidden sm:mt-20">
            <div className="grid md:grid-cols-2">
                {promoPackages?.map((promoPackage, index) => (
                    <motion.div key={index} initial={{ x: index % 2 !== 0 ? `20%` : `-20%` }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                        <PromotionCard
                            title={promoPackage?.title?.sr ?? t('homepage.promotions.tea_of_the_month')}
                            description={promoPackage?.subtitle?.sr ?? t('homepage.promotions.tea_of_the_month_description')}
                            bgImageSrc={promoPackage?.bg_image ?? ''}
                            cardClass={`lg:min-h-[513px]`}
                            variant={`package`}
                        >
                            <div className="flex items-end justify-between pt-6 lg:gap-20">
                                <div className={`flex flex-col space-y-6`}>
                                    {promoPackage.products.map((product: App.Data.ProductData, key: number) => (
                                        <PromotionCardItem key={key} product={product} />
                                    ))}
                                </div>

                                <motion.div
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.2 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center justify-end lg:-mb-10"
                                >
                                    <AddGroupedProductsToCartButton variant="secondary" products={promoPackage.products ?? []} />
                                </motion.div>
                            </div>
                        </PromotionCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Promotions;
