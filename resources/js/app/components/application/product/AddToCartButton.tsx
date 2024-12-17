import { Button } from '@/app/components/ui/button';
import { useForm } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

const AddToCartButton = ({ product }: { product?: App.Data.ProductData }) => {
    const { post } = useForm({
        product_id: product?.id,
        variation_id: product?.variations?.[0]?.id ?? null,
        quantity: 1,
    });

    const updateCart = () => {
        post(route('cart.store'), {
            preserveScroll: true,
        });
    };

    return (
        <Button variant="secondary" size="sm" onClick={updateCart}>
            <ShoppingCart />
        </Button>
    );
};

export default AddToCartButton;
