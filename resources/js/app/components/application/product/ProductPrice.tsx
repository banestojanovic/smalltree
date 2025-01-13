import { PageProps } from '@/app/types';
import { useTranslation } from 'react-i18next';

const ProductPrice = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    const { t } = useTranslation();

    return (
        <>
            {product.discount ? (
                <span className="flex items-center">
                    <span>
                        <span className="font-semibold">{product.price}</span> rsd
                    </span>
                    <span className="ml-3 text-gray-500 line-through">{product.price} rsd</span>
                </span>
            ) : (
                <span>
                    <span className="font-semibold">{product.price}</span> rsd
                </span>
            )}
        </>
    );
};

export default ProductPrice;
