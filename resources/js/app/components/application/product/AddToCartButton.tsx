import { Button, ButtonProps } from '@/app/components/ui/button';
import { useForm } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import VariationValueData = App.Data.VariationValueData;
import ProductVariationData = App.Data.ProductVariationData;

const AddToCartButton = ({
    product,
    productVariantId,
    quantity,
    showPrice,
    ...props
}: {
    product?: App.Data.ProductData;
    productVariantId: string | number | null;
    quantity?: number;
    showPrice?: boolean;
} & ButtonProps) => {
    const { post, setData } = useForm({
        product_id: product?.id,
        variation_id: productVariantId,
        quantity: quantity ?? 1,
    });

    const updateCart = () => {
        post(route('cart.store'), {
            preserveScroll: true,
        });
    };

    const matchingVariation = product?.variations?.find((variation: ProductVariationData) =>
        variation?.variations?.some((variationDetail: VariationValueData) => variationDetail?.pivot?.variation_value_id == productVariantId),
    );

    useEffect(() => {
        setData('variation_id', matchingVariation?.id ?? null);
    }, [productVariantId]);

    useEffect(() => {
        setData('quantity', quantity ?? 1);
    }, [quantity]);

    const price = matchingVariation ? matchingVariation.price : product?.price;

    return (
        <Button variant="secondary" onClick={updateCart} {...props}>
            <ShoppingCart />

            {showPrice && <span>{price ? `$${price.toFixed(2)}` : 'Price not available'}</span>}
        </Button>
    );
};

export default AddToCartButton;
