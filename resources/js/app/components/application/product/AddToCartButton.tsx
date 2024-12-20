import { Button } from '@/app/components/ui/button';
import { useForm } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

const AddToCartButton = ({ product, productVariantId, ...props }: { product?: App.Data.ProductData; productVariantId: string | number | null }) => {

    const { post } = useForm({
        product_id: product?.id,
        variation_id: productVariantId,
        quantity: 1,
    });

    const updateCart = () => {
        post(route('cart.store'), {
            preserveScroll: true,
        });
    };

    return (
        <Button variant="secondary" onClick={updateCart} {...props}>
            <ShoppingCart />
        </Button>
    );
};

export default AddToCartButton;
