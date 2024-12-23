import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter } from '@/app/components/ui/card';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/app/components/ui/typography';

const RelatedProducts = () => {
    const { t } = useTranslation();

    return (
        <Card className="flex h-full flex-col justify-between">
            <CardContent className="flex h-full items-center">
                <Typography
                    as="h2"
                    className="mx-auto flex max-w-20 items-center justify-center"
                >
                    Recommended tea or special promotion ...
                </Typography>
            </CardContent>

            <CardFooter className="mt-auto flex items-center justify-end">
                <Button>{t('enums.homepage.tea_ritual.purchase')}</Button>
            </CardFooter>
        </Card>
    );
};

export default RelatedProducts;
