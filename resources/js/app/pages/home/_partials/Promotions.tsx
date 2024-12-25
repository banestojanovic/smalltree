import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const Promotions = ({
    specialOffer,
    productOfTheMonth,
}: PageProps<{
    specialOffer?: App.Data.ProductData;
    productOfTheMonth?: App.Data.ProductData;
}>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 h-full sm:mt-20 md:h-80">
            <div className="container grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-[30%_auto] lg:gap-7">
                <Card className="relative h-full bg-cover bg-center sm:h-80" style={{ backgroundImage: `url(${productOfTheMonth.cover.original_url})` }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 z-0 rounded-lg bg-black bg-opacity-30"></div>

                    <CardContent className="relative z-10 h-full md:h-40">
                        <Typography as="h2" className="text-white">
                            {t('enums.homepage.promotions.tea_of_the_month')}
                        </Typography>

                        <Typography as="h3" className="mt-7 text-white !leading-8">
                            <Link href={route('products.show', productOfTheMonth.slug)}>{productOfTheMonth.name}</Link>
                        </Typography>

                        <p className="h-auto md:h-full">
                            <Typography as="h2" className="text-white">
                                ${productOfTheMonth.price}
                            </Typography>
                        </p>

                        <div className="mt-7 items-center justify-end md:mt-auto md:flex">
                            <Button asChild>
                                <Link href={route('products.show', productOfTheMonth.slug)}>{t('enums.homepage.hero.buy_now')}</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative h-full bg-cover bg-center sm:h-80" style={{ backgroundImage: `url(${specialOffer.cover.original_url})` }}>
                    {/* Overlay */}
                    <div className="absolute inset-0 z-0 rounded-lg bg-black bg-opacity-30"></div>

                    <CardContent className="relative z-10 h-full md:h-40">
                        <Typography as="h2" className="text-white">
                            {t('enums.homepage.promotions.special_offer')}
                        </Typography>

                        <Typography as="h3" className="mt-7 text-white !leading-8">
                            <Link href={route('products.show', specialOffer.slug)}>{specialOffer.name}</Link>
                        </Typography>

                        <p className="h-auto md:h-full">
                            <Typography as="h2" className="text-white">
                                ${specialOffer.price}
                            </Typography>
                        </p>

                        <div className="mt-7 items-center justify-end md:mt-auto md:flex">
                            <Button asChild>
                                <Link href={route('products.show', specialOffer.slug)}>{t('enums.homepage.hero.buy_now')}</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Promotions;
