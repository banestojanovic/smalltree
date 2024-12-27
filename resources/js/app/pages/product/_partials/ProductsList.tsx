import { useTranslation } from 'react-i18next';

import ProductCard from '@/app/components/application/product/ProductCard';
import Pagination from '@/app/components/ui/pagination';
import { PaginatedData } from '@/app/types';

const ProductsList = ({ products }: { products: PaginatedData<App.Data.ProductData> }) => {
    const { t } = useTranslation();

    return (
        products && (
            <section className="mt-10">
                <div className="container">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.data && products.data.length > 0 ? (
                            products.data.map((product: App.Data.ProductData) => <ProductCard product={product} key={product.id} />)
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">{t('enums.product.no_products_available')}.</p>
                        )}
                    </div>

                    <div className="mt-10 flex items-center justify-center">
                        <Pagination links={products.links} />
                    </div>
                </div>
            </section>
        )
    );
};

export default ProductsList;
