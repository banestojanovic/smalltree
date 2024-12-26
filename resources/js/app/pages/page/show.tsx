import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import DOMPurify from 'dompurify';

const PageShowPage = ({ page }: { page: App.Data.PageData }) => {
    const sanitizedContent = DOMPurify.sanitize(page.content ?? '');

    return (
        <>
            <Head title={page.name} />
            <div className="container my-7 sm:my-10">
                <Typography as="h2"> {page.name}</Typography>
                <div className="prose my-7" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
            </div>
        </>
    );
};
PageShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default PageShowPage;
