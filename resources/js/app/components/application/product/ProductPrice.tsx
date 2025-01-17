import useNumberFormatter from '@/functions';

const ProductPrice = ({ price, discountPrice, variant }: { price: number; discountPrice?: number | null; variant?: string | null }) => {
    const formatNumber = useNumberFormatter();

    return (
        <>
            {discountPrice ? (
                <div className={`flex items-baseline ${variant === 'light' ? 'text-xl' : ''}`}>
                    <span className={`space-x-0.5`}>
                        <span className={`${variant === 'light' ? 'font-light' : 'font-semibold'}`}>{formatNumber(discountPrice)}</span>
                        <span className={`font-light`}>rsd</span>
                    </span>
                    <span className={`ml-3 font-medium line-through ${variant === 'light' ? 'text-white' : 'text-foreground/50 text-sm'}`}>{formatNumber(price)} rsd</span>
                </div>
            ) : (
                <div>
                    <span className={`space-x-0.5 ${variant === 'light' ? 'text-xl' : ''}`}>
                        <span className={`${variant === 'light' ? 'font-light' : 'font-semibold'}`}>{formatNumber(price)}</span>
                        <span className={`font-light`}>rsd</span>
                    </span>
                </div>
            )}
        </>
    );
};

export default ProductPrice;
