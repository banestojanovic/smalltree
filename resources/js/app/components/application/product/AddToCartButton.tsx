import { Button } from '@/app/components/ui/button';
import { router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

interface Props {
    product: App.Data.ProductData;
}

const AddToCartButton = ({ product }: Props) => {
    function handleAddToCart() {
        router.post(route('cart.store'), {
            product_id: product.id,
            variation_id: product.variations[0]?.id,
            quantity: 1,
        });
        // console.log(product);
    }

    return (
        <Button variant="secondary" size="sm" onClick={handleAddToCart}>
            <ShoppingCart />
        </Button>
    );
};

export default AddToCartButton;
