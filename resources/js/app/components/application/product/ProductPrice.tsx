import useNumberFormatter from '@/functions';

const ProductPrice = ({ price, discountPrice }: { price: number; discountPrice?: number | null }) => {
    const formatNumber = useNumberFormatter();

    return (
        <>
            {discountPrice ? (
                <div className="flex items-end">
                    <span className={`space-x-0.5`}>
                        <span className="font-semibold">{formatNumber(discountPrice)}</span>
                        <span className={`font-light`}>rsd</span>
                    </span>
                    <span className="ml-3 text-sm font-[500] text-neutral-500 line-through">{formatNumber(price)} rsd</span>
                </div>
            ) : (
                <div>
                    <span className={`space-x-0.5`}>
                        <span className="font-semibold">{formatNumber(price)}</span>
                        <span className={`font-light`}>rsd</span>
                    </span>
                </div>
            )}
        </>
    );
};

export default ProductPrice;
