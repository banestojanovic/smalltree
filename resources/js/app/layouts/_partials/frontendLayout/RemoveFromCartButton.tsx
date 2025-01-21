import { Button } from '@/app/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RemoveFromCartButton({ product }: { product: App.Data.CartProductData }) {
    const { t } = useTranslation();

    const { submit } = useForm({
        product_id: product?.id,
        variation_id: product.pivot.product_variation_id ?? null,
    });

    const updateCart = () => {
        submit('delete', route('cart.remove'), {
            preserveScroll: true,
            only: ['auth', 'cart', 'flash', 'global'],
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <motion.div className="flex items-center justify-end" whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="circle">
                        <Trash2 className="text-destructive" />
                    </Button>
                </motion.div>
            </AlertDialogTrigger>
            <AlertDialogContent className={`bg-white`}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('cart.alert.title')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('cart.alert.description')}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={`max-sm:space-y-2`}>
                    <AlertDialogCancel className={`bg-white`}>{t('cart.alert.cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={updateCart}>{t('cart.alert.confirm')}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
