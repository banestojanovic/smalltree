import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { useTranslation } from 'react-i18next';

const Error = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('pages.not_found')} />
            <div className="container mx-auto my-8 w-full sm:my-16 md:max-w-5xl">
                <div>
                    <Typography as="h2" className={`sm:text-3xl`}>
                        {t('payments.failed.title')}
                    </Typography>
                    <Typography as="p" className={`text-foreground/80 mt-2 leading-normal sm:mt-4`}>
                        {t('payments.failed.description')}
                    </Typography>

                    <Button asChild className={`mt-4`}>
                        <Link href={route('checkout.show')}>{t('payments.failed.action')}</Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

Error.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default Error;
