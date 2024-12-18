import { Separator } from '@/app/components/ui/separator';
import RemoveFromCartButton from '@/app/layouts/_partials/frontendLayout/RemoveFromCartButton';
import UpdateCartQuantity from '@/app/layouts/_partials/frontendLayout/UpdateCartQuantity';

const ProductsLists = ({ cart }: { cart: App.Data.CartData }) => {
    return (
        <>
            <h3 className="sr-only">Items in your cart</h3>
            {cart.products ? (
                <ul className="space-y-4">
                    {cart.products?.map((product) => {
                        return (
                            <li key={product.id} className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-x-3 font-medium">
                                        <img src={product.cover.original_url} alt={product.name} className="aspect-square size-12 rounded-lg object-cover" />
                                        <div className="flex flex-col text-gray-500">
                                            <span>{product.name}</span>
                                            <div className="w-24">
                                                <UpdateCartQuantity product={product} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col text-sm font-medium">
                                    <p className="text-right text-lg font-semibold">${(product?.realPrice ?? 0).toFixed(2)}</p>
                                    <RemoveFromCartButton product={product} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <Separator />
            <dl className="space-y-6 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${(cart?.total ?? 0)?.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>

                <Separator />

                <div className="flex items-center justify-between pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">${(cart?.total ?? 0)?.toFixed(2)}</dd>
                </div>
            </dl>
        </>
    );
};

export default ProductsLists;
