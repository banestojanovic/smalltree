import { Button } from '@/app/components/ui/button';
import { AppDispatch } from '@/app/store';
import { addToCart } from '@/app/store/cartSlice';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';

interface Props {
    product: App.Data.ProductData;
}

const AddToCartButton = ({ product }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                product_id: product.id,
                variation_id: product.variations[0]?.id,
                quantity: 1,
            }),
        );
    };

    // function handleAddToCart() {
    //
    //     router.post(route('cart.store'), {
    //         product_id: product.id,
    //         variation_id: product.variations[0]?.id,
    //         quantity: 1,
    //     });
    // }

    return (
        <Button variant="secondary" size="sm" onClick={handleAddToCart}>
            <ShoppingCart />
        </Button>
    );
};

export default AddToCartButton;
