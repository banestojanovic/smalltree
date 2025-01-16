import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const CartButton = () => {
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
        });
    };

    return (
        <div className="hover:scale-10 relative transition">
            {cart?.products && cart.products.length > 0 && (
                <Badge variant={'destructive'} className="absolute -right-2 -top-1 inline-flex size-5 items-center justify-center rounded-full text-xs">
                    {cart.products.length}
                </Badge>
            )}
            <Button variant="ghost" size="icon" onClick={openCart} className="inline-flex size-10 items-center justify-center rounded-full bg-white transition-colors">
                {isLoading && <span className={`material-symbols-outlined animate-spin text-3xl`}>progress_activity</span>}
                {!isLoading && <span className={`material-symbols-outlined text-3xl`}>shopping_bag</span>}
            </Button>
        </div>
    );
};

export default CartButton;
