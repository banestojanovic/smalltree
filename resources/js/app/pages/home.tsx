import { PageProps } from '@/app/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Home({
    products,
}: PageProps<{ products: App.Data.ProductData }>) {
    const { t } = useTranslation()
    const { global } = usePage().props;
    console.log(global.categories);
    console.log(products);

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {t('enums.page.status.inactive')}
            </div>
        </>
    );
}
