import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/app/components/ui/typography';
import { Link } from '@inertiajs/react';

const PromotionProduct = ({ promotionProduct }: { promotionProduct: App.Data.ProductData }) => {
    const { t } = useTranslation();

    return (
        <Card className="relative h-full bg-cover bg-center" style={{ backgroundImage: `url(${promotionProduct.cover.original_url})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 z-0 rounded-lg bg-black bg-opacity-30"></div>

            <CardContent className="relative z-10 h-full md:h-80 xl:h-96">
                <Typography as="h2" className="text-white">
                    Recommended tea or special promotion ...
                </Typography>

                <Typography as="h3" className="mt-7 !leading-8 text-white">
                    <Link href={route('products.show', promotionProduct.slug)}>{promotionProduct.name}</Link>
                </Typography>

                <div className="h-auto md:h-full">
                    <Typography as="h2" className="text-white">
                        ${promotionProduct.price}
                    </Typography>
                </div>

                <div className="mt-7 items-center justify-end md:mt-auto md:flex">
                    <Button asChild variant="outline">
                        <Link href={route('products.show', promotionProduct.slug)}>{t('enums.homepage.hero.buy_now')}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PromotionProduct;
