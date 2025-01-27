import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const CartMobileNavButton = ({ size }: { size?: string }) => {
    const cart = usePage<PageProps<{ cart?: App.Data.CartData }>>().props.cart;
    const [isLoading, setIsLoading] = useState(false);

    const { get } = useForm();

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleFinish = () => setIsLoading(false);

        router.on('start', handleStart);
        router.on('finish', handleFinish);
    }, []);

    const openCart = () => {
        get(route('cart.open'), {
            preserveScroll: true,
            preserveState: true,
            only: ['auth', 'cart', 'flash', 'global'],
        });
    };

    return (
        <div className="active:sclae-95 relative flex size-full items-center justify-center transition hover:scale-105">
            {cart?.products && cart.products.length > 0 && (
                <Badge variant={'destructive'} className={`absolute -top-1 -right-2 z-10 inline-flex items-center justify-center ${size === 'small' ? 'size-4 text-xs' : 'size-5 text-sm'}`}>
                    {cart.products.length}
                </Badge>
            )}
            <Button variant="ghost" size="icon" onClick={openCart} className={`absolute inline-flex size-full items-center justify-center bg-white transition-colors`}>
                {isLoading && <span className={`material-symbols-outlined animate-spin ${size === 'small' ? 'text-xl' : 'text-3xl'}`}>progress_activity</span>}
                {!isLoading && <span className={`material-symbols-outlined ${size === 'small' ? 'text-2xl' : 'text-3xl'}\``}>shopping_bag</span>}
            </Button>
        </div>
    );
};

export default CartMobileNavButton;
