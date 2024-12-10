import { PageProps } from '@/app/types';
import { Head, usePage } from '@inertiajs/react';

export default function Home({
    products,
}: PageProps<{ products: App.Data.ProductData }>) {
    const { global } = usePage().props;
    console.log(global.categories);
    console.log(products);

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {/* should display products feed with category select */}
            </div>
        </>
    );
}
