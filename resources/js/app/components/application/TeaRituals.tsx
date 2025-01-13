import PromotionCard from '@/app/components/application/product/PomotionCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Typography } from '../ui/typography';
import PromotionCardItem from '@/app/components/application/product/PromotionCardItem';

const TeaRituals = ({
    matchRitual,
    mateRitual,
}: PageProps<{
    matchRitual?: App.Data.ProductData[];
    mateRitual?: App.Data.ProductData[];
}>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 h-full sm:mt-20 md:h-80">
            <div className="container grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-7">
                {matchRitual && matchRitual.length >= 2 && (
                    <PromotionCard
                        title={t('enums.homepage.tea_ritual.your_matcha_ritual')}
                        description={t('enums.homepage.promotions.tea_of_the_month_description')}
                        bgImageSrc={matchRitual[0].cover.original_url}
                    >
                        <div className="">
                            <PromotionCardItem product={matchRitual[0]} />
                            <PromotionCardItem product={matchRitual[1]} />

                            <div className="flex items-center justify-end">
                                <Button size="circle" variant="outline" asChild>
                                    <Link href={route('products.show', matchRitual[0].slug)}>
                                        <ShoppingBag />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </PromotionCard>
                )}

                {mateRitual && mateRitual.length >= 2 && (
                    <PromotionCard
                        title={t('enums.homepage.tea_ritual.your_mate_ritual')}
                        description={t('enums.homepage.promotions.special_offer_description')}
                        bgImageSrc={mateRitual[0].cover.original_url}
                    >
                        <div className="">
                            <PromotionCardItem product={mateRitual[0]} />
                            <PromotionCardItem product={mateRitual[1]} />
                            <div className="flex items-center justify-end">
                                <Button size="circle" variant="outline" asChild>
                                    <Link href={route('products.show', mateRitual[0].slug)}>
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


export default TeaRituals;
