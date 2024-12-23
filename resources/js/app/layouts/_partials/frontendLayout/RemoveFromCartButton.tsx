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
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Trash2 />
                    {t('cart.remove')}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>The product will be permanently removed from the cart</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={updateCart}>Remove product</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
