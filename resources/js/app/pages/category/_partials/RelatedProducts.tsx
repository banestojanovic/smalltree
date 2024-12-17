import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import ProductCard from '@/app/components/application/product/ProductCard';
import Pagination from '@/app/components/ui/pagination';
import PromotionProduct from '@/app/pages/category/_partials/PromotionProduct';
import { PaginatedData } from '@/app/types';

const RelatedProducts = () => {
    const { t } = useTranslation();

    const { products } = usePage<{
        products: PaginatedData<App.Data.ProductData>;
    }>().props;

    const { data, links } = products;

    return (
        <section className="mt-10">
            <div className="container">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="col-span-2">
                        <PromotionProduct />
                    </div>
                    {data && data.length > 0 ? (
                        data.map((product: App.Data.ProductData) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            {t('enums.product.no_products_available')}.
                        </p>
                    )}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <Pagination links={links} />
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
