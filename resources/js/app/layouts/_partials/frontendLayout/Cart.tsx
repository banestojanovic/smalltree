import { Button } from '@/app/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/app/components/ui/sheet';
import RemoveFromCartButton from '@/app/layouts/_partials/frontendLayout/RemoveFromCartButton';
import UpdateCartQuantity from '@/app/layouts/_partials/frontendLayout/UpdateCartQuantity';
import { PageProps } from '@/app/types';
import useNumberFormatter from '@/functions';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Cart() {
    const [open, setOpen] = useState(false);
    const cart = usePage<PageProps<{ cart?: App.Data.CartData }>>().props.cart;
    const global = usePage<PageProps<{ global?: PageProps['global'] }>>().props.global;

    const { t } = useTranslation();

    const formatNumber = useNumberFormatter();

    useEffect(() => {
        if (global?.action === 'cart.updated') {
            setOpen(true);
        }
    }, [global]);

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="w-full overflow-y-auto bg-white p-6 max-lg:w-11/12 lg:p-10">
                    <SheetHeader className={`text-left`}>
                        <SheetTitle className={`font-title text-3xl font-medium`}>{t('cart.cart')}</SheetTitle>
                    </SheetHeader>
                    <SheetDescription className="sr-only">{t('cart.cart')}</SheetDescription>
                    {cart?.products && cart?.products?.length > 0 ? (
                        <>
                            <div className="my-10">
                                <ul className="divide-input space-y-6 divide-y">
                                    {cart?.products?.map((product: App.Data.CartProductData) => (
                                        <li key={product.chosenId} className="flex justify-between pb-6 last:pb-0">
                                            <div className={`w-full`}>
                                                <div className="flex gap-x-3 font-medium">
                                                    {product.cover?.original_url && (
                                                        <img src={product.cover.original_url} alt={product.name} className="aspect-square size-14 rounded-lg object-cover" />
                                                    )}
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
                            </div>

                            <div className={`border-input mt-10 flex flex-col space-y-10 border-t pt-10 pb-6`}>
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
                                    <div className="flex items-center justify-between">
                                        <span>{t('order.tax')}</span>
                                        <span className={`space-x-px`}>
                                            <span className="font-semibold">20</span>
                                            <span className={`font-normal`}>%</span>
                                        </span>
                                    </div>
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
                                <div>
                                    <SheetClose asChild>
                                        <Button asChild className="h-10 w-full text-base uppercase" type="submit">
                                            {cart?.products && cart.products.length > 0 ? <Link href={route('checkout.show')}>{t('cart.check_out')}</Link> : ''}
                                        </Button>
                                    </SheetClose>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={`mt-6 flex flex-col space-y-3`}>
                            <div className="text-foreground mt-6 text-lg">{t('cart.cart_empty')}</div>
                            <SheetClose asChild>
                                <Button asChild className="h-10 w-full text-base uppercase" type="submit">
                                    <Link href={route('home')}>{t('cart.continue_shopping')}</Link>
                                </Button>
                            </SheetClose>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}
