import { Button } from '@/app/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/app/components/ui/sheet';
import { AppDispatch, RootState } from '@/app/store';
import { fetchCart, selectCartTotal } from '@/app/store/cartSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function CartButton() {
    const { t } = useTranslation();

    const { items, status } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const total = useSelector(selectCartTotal);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCart());
        }
    }, [status, dispatch]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">{t('enums.menu.top.cart')}</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{t('enums.cart.cart')}</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    {items ? (
                        <ul className="space-y-4">
                            {items.products.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <p className="flex items-center gap-x-3 font-medium">
                                            <img
                                                src={item.cover.original_url}
                                                alt={item.name}
                                                className="h-14 w-14 rounded-lg"
                                            />
                                            <div className="flex flex-col text-gray-500">
                                                <span>{item.name}</span>
                                                <p className="flex items-center justify-between gap-x-3">
                                                    <span>
                                                        x{item.quantity}
                                                    </span>
                                                </p>
                                            </div>
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-sm font-medium">
                                        <p>
                                            $
                                            {(
                                                item.quantity * item.price
                                            ).toFixed(2)}
                                        </p>

                                        <p>Delete</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">
                            Your cart is empty.
                        </p>
                    )}

                    <div className="mt-7">
                        <div className="flex items-center justify-between">
                            <span>Shipping</span>
                            <span className="text-lg font-bold">$0</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Total</span>
                            <span className="text-lg font-bold">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button className="block w-full" type="submit">
                            {t('enums.cart.check_out')}
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
