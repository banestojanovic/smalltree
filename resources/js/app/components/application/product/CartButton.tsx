import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const CartButton = ({ size }: { size?: string }) => {
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
        <div className="active:sclae-95 relative transition hover:scale-105">
            <div>
                {cart?.products && cart.products.length > 0 && (
                    <Badge
                        variant={'destructive'}
                        className={`absolute -top-1 -right-2 z-10 inline-flex items-center justify-center rounded-full ${size === 'small' ? 'size-4 text-xs' : 'size-5 text-sm'}`}
                    >
                        {cart.products.length}
                    </Badge>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={openCart}
                    className={`inline-flex items-center justify-center rounded-full bg-white transition-colors ${size === 'small' ? 'size-6' : 'size-10'}`}
                >
                    {isLoading && <span className={`material-symbols-outlined animate-spin ${size === 'small' ? 'text-xl' : 'text-3xl'}`}>progress_activity</span>}
                    {!isLoading && <span className={`material-symbols-outlined ${size === 'small' ? 'text-2xl' : 'text-3xl'}\``}>shopping_bag</span>}
                </Button>
            </div>
        </div>
    );
};

export default CartButton;
