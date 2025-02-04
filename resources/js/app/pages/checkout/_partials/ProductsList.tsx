import RemoveFromCartButton from '@/app/layouts/_partials/frontendLayout/RemoveFromCartButton';
import UpdateCartQuantity from '@/app/layouts/_partials/frontendLayout/UpdateCartQuantity';
import useNumberFormatter from '@/functions';
import { useTranslation } from 'react-i18next';

const ProductsLists = ({ cart }: { cart: App.Data.CartData }) => {
    const formatNumber = useNumberFormatter();
    const { t } = useTranslation();

    return (
        <>
            <h3 className="sr-only">Items in your cart</h3>
            {cart?.products ? (
                <ul className="space-y-4">
                    {cart?.products?.map((product: App.Data.CartProductData, index: number) => (
                        <li key={index} className="flex justify-between pt-4">
                            <div className={`w-full`}>
                                <div className="flex gap-x-3 font-medium">
                                    {product.cover?.original_url && <img src={product.cover.original_url} alt={product.name} className="aspect-square size-14 rounded-lg object-cover" />}
                                    <div className="flex w-full flex-col space-y-3">
                                        <div className={`flex flex-col`}>
                                            <span className="font-title">{product.name}</span>
                                            {product?.variation && (
                                                <span className="text-foreground/50 text-xs">
                                                    {`${product.variation?.variation?.name}:`} {product.variation.value}
                                                </span>
                                            )}
                                        </div>
                                        <div className="xs:hidden flex justify-between text-sm font-medium">
                                            <div className="flex flex-col">
                                                <p className={`flex items-center space-x-px`}>
                                                    <span className={'font-semibold'}>{formatNumber(product.total)}</span>
                                                    <span className={`font-normal`}>rsd</span>
                                                </p>
                                                {product?.pivot.price && product.pivot.real_price !== product.pivot.price && (
                                                    <p className={`flex items-center space-x-px text-xs`}>
                                                        <span className={'text-foreground/50 line-through'}>{formatNumber(product.pivot.real_price * product.pivot.quantity)}</span>
                                                        <span className={`font-normal`}>rsd</span>
                                                    </p>
                                                )}
                                                {product?.variation && (
                                                    <span className="text-foreground/50 text-xs">
                                                        {`${product.variation?.variation?.name}:`} {product.variation.value}
                                                    </span>
                                                )}
                                            </div>
                                            <RemoveFromCartButton product={product} />
                                        </div>
                                        <div className="w-24">
                                            <UpdateCartQuantity product={product} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xs:flex ml-4 hidden flex-col items-end text-sm font-medium">
                                <p className={`flex items-center space-x-px`}>
                                    <span className={'font-semibold'}>{formatNumber(product.total)}</span>
                                    <span className={`font-normal`}>rsd</span>
                                </p>
                                {product?.pivot.price && product.pivot.real_price !== product.pivot.price && (
                                    <p className={`flex items-center space-x-px text-xs`}>
                                        <span className={'text-foreground/50 line-through'}>{formatNumber(product.pivot.real_price * product.pivot.quantity)}</span>
                                        <span className={`font-normal`}>rsd</span>
                                    </p>
                                )}
                                <RemoveFromCartButton product={product} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                ''
            )}

            <div className={`mt-10 flex flex-col space-y-10`}>
                <div className={`w-full space-y-6`}>
                    {cart && cart?.subtotal > 0 && (
                        <div className="flex items-center justify-between">
                            <span>{t('order.subtotal')}</span>
                            <span className={`space-x-px`}>
                                <span className="font-semibold">{formatNumber(cart?.subtotal ?? 0)}</span>
                                <span className={`font-normal`}>rsd</span>
                            </span>
                        </div>
                    )}
                    {cart && cart?.shipping > 0 && (
                        <div className="flex items-center justify-between">
                            <span>{t('order.shipping')}</span>
                            <span className={`space-x-px`}>
                                <span className="font-semibold">{formatNumber(cart?.shipping ?? 0)}</span>
                                <span className={`font-normal`}>rsd</span>
                            </span>
                        </div>
                    )}
                    {cart && cart?.discount > 0 && (
                        <div className="flex items-center justify-between">
                            <span>{t('order.discount')}</span>
                            <span className={`space-x-px`}>
                                <span className="font-semibold">-{formatNumber(cart?.discount ?? 0)}</span>
                                <span className={`font-normal`}>rsd</span>
                            </span>
                        </div>
                    )}
                    {cart && cart?.total > 0 && (
                        <div className="border-input flex items-center justify-between border-t pt-4">
                            <span className={`text-2xl`}>{t('order.total')}</span>
                            <span className={`space-x-px`}>
                                <span className="font-semibold">{formatNumber(cart?.total ?? 0)}</span>
                                <span className={`font-normal`}>rsd</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductsLists;
