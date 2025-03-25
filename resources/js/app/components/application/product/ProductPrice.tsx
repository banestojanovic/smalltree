import useNumberFormatter from '@/functions';
import { cn } from '@/lib/utils';

const ProductPrice = ({ price, discountPrice, variant }: { price: number; discountPrice?: number | null; variant?: string | null }) => {
    const formatNumber = useNumberFormatter();

    return (
        <>
            {discountPrice ? (
                <div className={`flex items-baseline ${variant === 'light' ? 'text-xl' : ''}`}>
                    <span className={`space-x-0.5`}>
                        <span className={`${variant === 'light' ? 'font-light' : 'font-semibold'}`}>{formatNumber(discountPrice)}</span>
                        <span className={`font-light ${variant === 'single' ? 'text-base' : ''}`}>rsd</span>
                    </span>
                    <span className={cn(`ml-3 font-medium line-through ${variant === 'light' ? 'text-white' : 'text-foreground/50 text-sm'} ${variant === 'single' ? 'text-base' : ''}`)}>
                        {formatNumber(price)} rsd
                    </span>
                </div>
            ) : (
                <div>
                    <span className={`space-x-0.5 ${variant === 'light' ? 'text-xl' : ''}`}>
                        <span className={`${variant === 'light' ? 'font-light' : 'font-semibold'}`}>{formatNumber(price)}</span>
                        <span className={`font-light ${variant === 'single' ? 'text-base' : ''}`}>rsd</span>
                    </span>
                </div>
            )}
        </>
    );
};

export default ProductPrice;
