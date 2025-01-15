import { PageProps } from '@/app/types';
import { useTranslation } from 'react-i18next';

const ProductPrice = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    const { t } = useTranslation();

    return (
        <>
            {product?.discount?.price ? (
                <div className="flex items-end">
                    <span className={`space-x-0.5`}>
                        <span className="font-semibold">{product.discount.price.toFixed(2)}</span>
                        <span className={`font-light`}>rsd</span>
                    </span>
                    <span className="ml-3 text-sm font-[500] text-neutral-500 line-through">{product.price?.toFixed(2)} rsd</span>
                </div>
            ) : (
                <div>
                    <span className="font-semibold">{product.price?.toFixed(2)}</span> rsd
                </div>
            )}
        </>
    );
};

export default ProductPrice;
