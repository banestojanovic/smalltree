import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { useTranslation } from 'react-i18next';

const PageShowPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('page.about.title')} />
            <div className="container my-7 space-y-10 sm:my-10">
                <div>
                    <Typography as="h2" className={`sm:text-3xl`}>
                        {t('page.about.title')}
                    </Typography>
                    <Typography as="p" className={`text-foreground/80 mt-2 leading-normal sm:mt-4`}>
                        {t('page.about.subtitle')}
                    </Typography>
                </div>

                <div className={`grid gap-6 md:grid-cols-2`}>
                    <figure className={`relative overflow-hidden rounded-md max-md:aspect-video`}>
                        <img src="/storage/site/salon/salon-6.jpg" alt="Slika Small Tree salona" className={`absolute inset-0 size-full rounded-md object-cover`} />
                    </figure>

                    <div className={`prose text-foreground xxs:prose-base md:prose-sm lg:prose-base`}>
                        <p>{t('page.about.content.first')}</p>
                        <p>{t('page.about.content.second')}</p>
                        <p>{t('page.about.content.third')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
                    <figure className={`rounded-lg`}>
                        <img className={'aspect-square w-full rounded-lg object-cover'} src="/storage/site/salon/salon-7.jpg" alt="Slika salona" />
                    </figure>
                    <figure className={`rounded-lg`}>
                        <img className={'aspect-square w-full rounded-lg object-cover'} src="/storage/site/salon/salon-8.jpg" alt="Slika salona" />
                    </figure>
                    <figure className={`rounded-lg`}>
                        <img className={'aspect-square w-full rounded-lg object-cover'} src="/storage/site/salon/salon-9.jpg" alt="Slika salona" />
                    </figure>
                    <figure className={`rounded-lg`}>
                        <img className={'aspect-square w-full rounded-lg object-cover'} src="/storage/site/salon/salon-10.jpg" alt="Slika salona" />
                    </figure>
                    <figure className={`rounded-lg`}>
                        <img className={'aspect-square w-full rounded-lg object-cover'} src="/storage/site/salon/salon-1.jpg" alt="Slika salona" />
                    </figure>
                    <figure className={`rounded-lg`}>
                        <img className={'aspect-square w-full rounded-lg object-cover'} src="/storage/site/salon/salon-2.jpg" alt="Slika salona" />
                    </figure>
                </div>
            </div>
        </>
    );
};
PageShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default PageShowPage;
