import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Separator } from '@/app/components/ui/separator';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProducsList from '@/app/pages/checkout/_partials/ProducsList';
import { PageProps } from '@/app/types';
import { useTranslation } from 'react-i18next';

const paymentMethods = [
    { id: 1, title: 'Credit card' },
    { id: 2, title: 'Cash on Delivery' },
];

const CheckoutIndex = () => {
    const { t } = useTranslation();

    const cart = usePage<PageProps<{ cart?: App.Data.CartData }>>().props.cart;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        company: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        postal_code: '',
        payment_method: 2,
    });

    console.log(errors);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('orders.store'));
    };

    return (
        <>
            <Head title="Checkout" />
            <div className="container mx-auto w-full md:max-w-5xl">
                <div className="bg-gray-50">
                    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Checkout</h2>

                        <form onSubmit={submit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-12">
                            <div>
                                <div>
                                    <Typography as="h3">Contact information</Typography>

                                    <Card>
                                        <CardContent>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="email">Email</Label>
                                                <Input type="email" id="email" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                            </div>

                                            <div className="mt-5 grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input id="phone" placeholder="Telephone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Separator />

                                {/* Shipping Info */}
                                <div className="mt-10">
                                    <Typography as="h3">Shipping information</Typography>

                                    <Card>
                                        <CardContent>
                                            <div className="md:flex md:items-center gap-x-5">
                                                <div className="">
                                                    <Label htmlFor="first_name">First name</Label>
                                                    <Input id="first_name" placeholder="First name" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                                                </div>

                                                <div className="mt-5 md:mt-0">
                                                    <Label htmlFor="last_name">Last name</Label>
                                                    <Input id="last_name" placeholder="Last name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="mt-5">
                                                <Label htmlFor="copmpany">Company</Label>
                                                <Input id="copmpany" placeholder="Company" value={data.company} onChange={(e) => setData('copmpany', e.target.value)} />
                                            </div>

                                            <div className="mt-5">
                                                <Label htmlFor="address_line_1">Address Line 1</Label>
                                                <Input id="address_line_1" placeholder="Address Line 1" value={data.address_line_1} onChange={(e) => setData('address_line_1', e.target.value)} />
                                            </div>

                                            <div className="mt-5">
                                                <Label htmlFor="address_line_2">Address Line 2</Label>
                                                <Input id="address_line_2" placeholder="Address Line 2" value={data.address_line_2} onChange={(e) => setData('address_line_2', e.target.value)} />
                                            </div>

                                            <div className="mt-5 md:flex md:items-center gap-x-5">
                                                <div className="">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" placeholder="City" value={data.city} onChange={(e) => setData('city', e.target.value)} />
                                                </div>
                                                <div className="mt-5 md:mt-0">
                                                    <Label htmlFor="postal_code">Postal Code / Zip</Label>
                                                    <Input id="postal_code" placeholder="Postal Code" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Separator />

                                {/* Payment Method */}
                                <div className="mt-10">
                                    <Typography as="h3">Payment</Typography>

                                    <RadioGroup onValueChange={(e) => setData('payment_method', parseInt(e))} defaultValue={data.payment_method} className="flex w-full flex-wrap items-center gap-3">
                                        {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                                            <Card className="w-full" key={paymentMethodIdx}>
                                                <CardContent>
                                                    <div className="flex w-full items-center space-x-2">
                                                        <RadioGroupItem value={paymentMethod.id} id={`payment_method_${paymentMethod.id}`} />
                                                        <Label htmlFor={`payment_method_${paymentMethod.id}`}>{paymentMethod.title} </Label>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Order summary */}
                            <div className="mt-10 lg:mt-0">
                                <Typography as="h3">Order Summery</Typography>

                                <Card>
                                    <CardContent>
                                        <ProducsList cart={cart} />

                                        <Separator />

                                        <div className="px-4 py-6 sm:px-6">
                                            <Button type="submit" className="block w-full">
                                                Confirm order
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

CheckoutIndex.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default CheckoutIndex;
