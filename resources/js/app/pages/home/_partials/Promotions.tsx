import PromotionCard from '@/app/components/application/product/PomotionCard';
import PromotionCardItem from '@/app/components/application/product/PromotionCardItem';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Promotions = ({
    specialOffer,
    productOfTheMonth,
}: PageProps<{
    specialOffer: App.Data.ProductData;
    productOfTheMonth: App.Data.ProductData;
}>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 h-full sm:mt-20 md:h-80">
            <div className="container grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-[40%_auto] lg:gap-7">
                {productOfTheMonth && (
                    <PromotionCard
                        title={t('enums.homepage.promotions.tea_of_the_month')}
                        description={t('enums.homepage.promotions.tea_of_the_month_description')}
                        bgImageSrc={productOfTheMonth.cover?.original_url ?? ''}
                    >
                        <div className="mt-7 items-center justify-between md:mt-auto md:flex">
                            <PromotionCardItem product={productOfTheMonth} />

                            <div className="flex items-center justify-end">
                                <Button size="circle" variant="outline" asChild>
                                    <Link href={route('products.show', productOfTheMonth.slug)}>
                                        <ShoppingBag />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </PromotionCard>
                )}

                {specialOffer && (
                    <PromotionCard
                        title={t('enums.homepage.promotions.special_offer')}
                        description={t('enums.homepage.promotions.special_offer_description')}
                        bgImageSrc={specialOffer.cover?.original_url ?? ''}
                    >
                        <div className="mt-7 items-center justify-between md:mt-auto md:flex">
                            <PromotionCardItem product={specialOffer} />

                            <div className="flex items-center justify-end">
                                <Button size="circle" variant="outline" asChild>
                                    <Link href={route('products.show', specialOffer.slug)}>
                                        <ShoppingBag />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </PromotionCard>
                )}
            </div>
        </section>
    );
};

export default Promotions;
