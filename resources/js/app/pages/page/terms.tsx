import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

const TermsPage = ({ document }: { document?: string }) => {
    const { t } = useTranslation();
    const sanitizedContent = DOMPurify.sanitize(document ?? '');

    return (
        <>
            <Head title={t('page.about.title')} />
            <div className="container mt-7 max-w-4xl space-y-6 sm:mt-16 lg:space-y-10">
                <div>
                    <Typography as="h2" className={`sm:text-3xl`}>
                        {t('page.terms.title')}
                    </Typography>
                    <Typography as="p" className={`text-foreground/80 mt-2 leading-normal sm:mt-4`}>
                        {t('page.terms.subtitle')}
                    </Typography>
                </div>

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
            </div>
        </>
    );
};
TermsPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default TermsPage;
