import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/separator';
import { Typography } from '../ui/typography';

const TeaRituals = () => {
    const { t } = useTranslation();

    return (
        <section className="mt-5 border-b-2 border-t-2 border-gray-300 pt-7 sm:mt-10 md:pt-0">
            <div className="container grid grid-cols-1 divide-gray-300 lg:grid-cols-2 lg:divide-x-2">
                <div className="flex h-full flex-col items-center justify-center gap-5 md:h-72 lg:h-96">
                    <h2 className="scroll-m-20 text-center text-3xl font-semibold tracking-tight first:mt-0">
                        <p>{t('enums.homepage.tea_ritual.your_matcha')}</p>
                        <p>{t('enums.homepage.tea_ritual.tea_ritual')}</p>
                    </h2>

                    <div className="flex flex-col items-center gap-x-5 md:flex-row">
                        <Card>
                            <CardContent>
                                <Typography as="h3">{t('enums.homepage.tea_ritual.tea')}</Typography>
                            </CardContent>
                        </Card>
                        <Typography as="h4">+</Typography>
                        <Card>
                            <CardContent>
                                <Typography as="h3">{t('enums.homepage.tea_ritual.tea_mug')}</Typography>
                            </CardContent>
                        </Card>

                        <Typography as="h4">=</Typography>

                        <Card>
                            <CardContent>
                                <Typography as="h3">{t('enums.homepage.tea_ritual.set')}</Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="">
                        <Button>{t('enums.homepage.tea_ritual.purchase')}</Button>
                    </div>
                </div>

                <Separator className="my-7 block md:my-0 lg:hidden" />

                <div className="flex h-full flex-col items-center justify-center gap-5 md:h-72 lg:h-96 pb-7 md:pb-0">
                    <h2 className="scroll-m-20 text-center text-3xl font-semibold tracking-tight first:mt-0">
                        <p>{t('enums.homepage.tea_ritual.your_mate')}</p>
                        <p>{t('enums.homepage.tea_ritual.tea_ritual')}</p>
                    </h2>

                    <div className="flex flex-col items-center gap-x-5 md:flex-row">
                        <Card>
                            <CardContent>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t('enums.homepage.tea_ritual.tea')}</h3>
                            </CardContent>
                        </Card>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">+</h4>
                        <Card>
                            <CardContent>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t('enums.homepage.tea_ritual.tea_mug')}</h3>
                            </CardContent>
                        </Card>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">=</h4>
                        <Card>
                            <CardContent>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{t('enums.homepage.tea_ritual.set')}</h3>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="">
                        <Button>{t('enums.homepage.tea_ritual.purchase')}</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeaRituals;
