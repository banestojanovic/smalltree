import ApplicationLogo from '@/app/components/ApplicationLogo';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TopNavbar() {
    const cart = usePage<PageProps<{ cart?: App.Data.CartData }>>().props.cart;

    const { t } = useTranslation();

    const openCart = () => {
        router.get(route('cart.open'));
    };

    return (
        <div>
            <div className="container">
                <div className="hidden h-24 items-center gap-x-4 lg:flex">
                    <div className="flex w-5/12 flex-wrap items-center gap-5">
                        <a href="tel:+3811113820466" className="flex items-center gap-x-1 text-sm">
                            <Phone className="size-5" stroke-width={1} />
                            +381 111 3820466
                        </a>
                        <a href="mailto:office@smalltree.rs" target="_blank" className="flex items-center gap-x-2 text-sm" rel="noreferrer">
                            <Mail className="size-5" stroke-width={1} />
                            office@smalltrees.rs
                        </a>

                        <a href="#" target="_blank" className="flex items-center gap-x-1 text-sm">
                            <MapPin className="size-5" stroke-width={1} />
                            {t('enums.menu.top.locations')}
                        </a>
                    </div>

                    <div className="flex w-2/12 items-center justify-center">
                        <Link href="/">
                            <ApplicationLogo className="block size-20 fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>

                    <div className="flex w-5/12 items-center justify-end gap-x-5">
                        <div className="relative">
                            {cart?.products && cart.products.length > 0 && (
                                <Badge className="absolute -right-1 top-1 inline-flex size-4 items-center justify-center rounded-full text-xs">{cart.products.length}</Badge>
                            )}
                            <Button variant="outline" size="icon" onClick={openCart} className="inline-flex size-10 items-center justify-center rounded-full bg-white transition-colors">
                                <ShoppingBag className="size-10" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="block h-full py-2 lg:hidden">
                    <div className="grid grid-cols-3 gap-x-3">
                        <div className="flex flex-col gap-2">
                            <a href="tel:+3811113820466" className="flex items-center gap-x-1 text-sm">
                                <Phone className="size-4" />
                                +381 111 3820466
                            </a>
                            <a href="mailto:office@smalltrees.rs" target="_blank" className="flex items-center gap-x-1 text-sm" rel="noreferrer">
                                <Mail className="size-4" />
                                office@smalltrees.rs
                            </a>

                            <a href="#" target="_blank" className="flex items-center gap-x-1 text-sm">
                                <MapPin className="size-4" />
                                {t('enums.menu.top.locations')}
                            </a>
                        </div>
                        <Link href="/">
                            <ApplicationLogo className="block size-20 fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                        <div className="flex items-center justify-end">
                            <div className="relative">
                                {cart?.products && cart.products.length > 0 && (
                                    <Badge className="absolute -right-1 top-1 inline-flex size-4 items-center justify-center rounded-full text-xs">{cart.products.length}</Badge>
                                )}
                                <Button variant="outline" size="icon" onClick={openCart} className="inline-flex size-10 items-center justify-center rounded-full bg-white transition-colors">
                                    <ShoppingBag className="size-10" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
