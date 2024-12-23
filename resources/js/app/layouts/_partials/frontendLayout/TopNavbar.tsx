import ApplicationLogo from '@/app/components/ApplicationLogo';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function TopNavbar() {
    const cart = usePage<PageProps<{ cart?: App.Data.CartData }>>().props.cart;

    const { t } = useTranslation();

    const openCart = () => {
        router.get(route('cart.open'));
    };

    return (
        <div className="border-b-2 border-gray-200">
            <div className="container">
                <div className="hidden h-24 grid-cols-3 gap-x-4 lg:grid">
                    <div className="flex flex-wrap items-center gap-x-5">
                        <p className="text-sm">+391 00 000 000</p>
                        <p className="text-sm">contact@smalltree.com</p>
                        <p className="text-sm">{t('enums.menu.top.locations')}</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-20 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end gap-x-5">
                        <p className="text-sm">{t('enums.menu.top.favorites')}</p>
                        <div className="relative">
                            {cart?.products && cart.products.length > 0 && <Badge className="absolute -right-1 -top-1">{cart.products.length}</Badge>}
                            <Button variant="outline" onClick={openCart}>
                                {t('enums.menu.top.cart')}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="block h-full lg:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-x-5">
                            <p className="text-xs">+391 00 000 000</p>
                            <p className="text-xs">contact@smalltree.com</p>
                            <p className="text-xs">{t('enums.menu.top.locations')}</p>
                        </div>
                        <Link href="/">
                            <ApplicationLogo className="block h-20 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                        <div className="flex flex-col justify-between gap-x-5">
                            <p className="mb-1 text-xs">{t('enums.menu.top.favorites')}</p>
                            <div className="relative">
                                {cart?.products && cart.products.length > 0 && <Badge className="absolute -right-1 -top-1">{cart.products.length}</Badge>}
                                <Button variant="outline" onClick={openCart}>
                                    {t('enums.menu.top.cart')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
