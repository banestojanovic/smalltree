import { Button } from '@/app/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/sheet';
import RemoveFromCartButton from '@/app/layouts/_partials/frontendLayout/RemoveFromCartButton';
import UpdateCartQuantity from '@/app/layouts/_partials/frontendLayout/UpdateCartQuantity';
import { PageProps } from '@/app/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Cart() {
    const [open, setOpen] = useState(false);
    const cart = usePage<PageProps<{ cart?: App.Data.CartData }>>().props.cart;
    const global = usePage<PageProps<{ global?: PageProps['global'] }>>().props.global;

    const { t } = useTranslation();

    useEffect(() => {
        if (global?.action === 'cart.updated') {
            setOpen(true);
        }
    }, [global]);

    return (
        <>
            {cart?.products && cart.products.length > 0 && (
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <div className="relative">
                            {cart?.products && cart.products.length > 0 && <Badge className="absolute -right-1 -top-1">{cart.products.length}</Badge>}
                            <Button variant="outline">{t('enums.menu.top.cart')}</Button>
                        </div>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{t('cart.cart')}</SheetTitle>
                        </SheetHeader>
                        <SheetDescription className="sr-only">Cart products</SheetDescription>
                        <div className="py-4">
                            {cart?.products ? (
                                <ul className="space-y-4">
                                    {cart?.products?.map((product: App.Data.CartProductData) => (
                                        <li key={product.id} className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center gap-x-3 font-medium">
                                                    <img src={product.cover.original_url} alt={product.name} className="aspect-square size-14 rounded-lg object-cover" />
                                                    <div className="flex flex-col text-gray-500">
                                                        <span>{product.name}</span>
                                                        <div className="w-24">
                                                            <UpdateCartQuantity product={product} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col text-sm font-medium">
                                                <p>${(product?.realPrice ?? 0).toFixed(2)}</p>

                                                <RemoveFromCartButton product={product} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">Your cart is empty.</p>
                            )}

                            <div className="mt-7">
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span className="text-lg font-bold">$0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Total</span>
                                    <span className="text-lg font-bold">${(cart?.total ?? 0)?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button asChild className="block w-full" type="submit">
                                    {cart?.products && cart.products.length > 0 ? <Link href={route('checkout.show')}>{t('cart.check_out')}</Link> : ''}
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            )}
        </>
    );
}
