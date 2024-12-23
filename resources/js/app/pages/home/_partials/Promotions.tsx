import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useTranslation } from 'react-i18next';

const Promotions = () => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 h-full md:h-80 sm:mt-20">
            <div className="container grid grid-cols-1 gap-7 md:grid-cols-[30%_auto]">
                <Card>
                    <CardHeader className="py-6">
                        <CardTitle>
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">{t('enums.homepage.promotions.tea_of_the_month')}</h2>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="h-full md:h-40"></p>
                    </CardContent>

                    <CardFooter className="mt-auto flex items-center justify-end">
                        <Button>{t('enums.homepage.hero.buy_now')}</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="py-6">
                        <CardTitle>
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">{t('enums.homepage.promotions.special_offer')}</h2>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="h-full md:h-40"></p>
                    </CardContent>

                    <CardFooter className="mt-auto flex items-center justify-end">
                        <Button>{t('enums.homepage.hero.buy_now')}</Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
};

export default Promotions;
