import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
            only: ['auth', 'cart', 'flash', 'global'],
        });
    };

    return (
        <div className="hover:scale-10 relative transition">
            <motion.div
                whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.8 }}
            >
                {cart?.products && cart.products.length > 0 && (
                    <Badge variant={'destructive'} className="absolute -right-2 -top-1 inline-flex size-5 items-center justify-center rounded-full text-xs">
                        {cart.products.length}
                    </Badge>
                )}
                <Button variant="ghost" size="icon" onClick={openCart} className="inline-flex size-10 items-center justify-center rounded-full bg-white transition-colors">
                    {isLoading && <span className={`material-symbols-outlined animate-spin text-3xl`}>progress_activity</span>}
                    {!isLoading && <span className={`material-symbols-outlined text-3xl`}>shopping_bag</span>}
                </Button>
            </motion.div>
        </div>
    );
};

export default CartButton;
