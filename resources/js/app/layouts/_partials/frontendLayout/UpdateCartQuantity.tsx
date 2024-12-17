import { NumberInput } from '@/app/components/NumberInput';
import { useForm } from '@inertiajs/react';

export default function UpdateCartQuantity({ product }: { product: App.Data.CartProductData }) {
    const { submit, data } = useForm({
        product_id: product?.id,
        variation_id: product.pivot.product_variation_id ?? null,
        quantity: product.pivot?.quantity ?? 1,
    });

    const updateCart = (value: number | undefined) => {
        data.quantity = value ?? product.quantity;

        submit('put', route('cart.update'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Product removed from cart');
            },
        });
    };

    return <NumberInput defaultValue={product.quantity} min={1} max={product.stock ?? 99} onValueChange={(value) => updateCart(value)} />;
}
