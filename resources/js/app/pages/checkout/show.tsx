import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import FieldGroup from '@/app/components/ui/FieldGroup';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Separator } from '@/app/components/ui/separator';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductsList from '@/app/pages/checkout/_partials/ProductsList';
import { PageProps } from '@/app/types';
import { useTranslation } from 'react-i18next';

const paymentMethods = [
    { id: '1', title: 'Credit card' },
    { id: '2', title: 'Cash on Delivery' },
];

const CheckoutIndex = () => {
    const { t } = useTranslation();

    const cart = usePage<PageProps<{ cart: App.Data.CartData }>>().props.cart;
    const global = usePage<PageProps<{ global: App.Data.GlobalData }>>().props.global;

    const { data, setData, post, errors } = useForm({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        postal_code: '',
        payment_method: '2',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('orders.store'), {
            preserveScroll: true,
        });
    };

    const fillWithTestData = () => {
        setData({
            email: 'test@example.com',
            phone: '+1234567890',
            first_name: 'John',
            last_name: 'Doe',
            address_line_1: '123 Test Street',
            address_line_2: 'Apt 4B',
            city: 'Test City',
            postal_code: '12345',
            payment_method: '2',
        });
    };

    return (
        <>
            <Head title={t('checkout.checkout')} />
            <div className="container mx-auto w-full md:max-w-5xl">
                <div className="mx-auto max-w-2xl py-7 lg:max-w-7xl lg:py-20">
                    <h2 className="sr-only">{t('checkout.checkout')}</h2>

                    {global?.env === 'local' && (
                        <Button variant={'outline'} type={'button'} onClick={fillWithTestData}>
                            {t('checkout.fill_with_test_data')}
                        </Button>
                    )}

                    <form onSubmit={submit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-12">
                        <div>
                            <div>
                                <Typography as="h3">{t('checkout.contact_info')}</Typography>

                                <div className="mt-5">
                                    <FieldGroup label="Email" name="email" error={errors.email}>
                                        <Input id="email" type="email" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    </FieldGroup>

                                    <div className="mt-5">
                                        <FieldGroup label="Phone" name="phone" error={errors.phone}>
                                            <Input id="phone" placeholder="Phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                        </FieldGroup>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Shipping Info */}
                            <div className="mt-10">
                                <Typography as="h3">{t('checkout.shipping_info')}</Typography>

                                <div className="mt-5">
                                    <div className="gap-x-5 md:flex md:items-center">
                                        <div className="w-full">
                                            <FieldGroup label="First Name" name="first_name" error={errors.first_name}>
                                                <Input id="first_name" placeholder="First name" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                                            </FieldGroup>
                                        </div>

                                        <div className="mt-5 w-full md:mt-0">
                                            <FieldGroup label="Last Name" name="last_name" error={errors.last_name}>
                                                <Input id="last_name" placeholder="First name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                                            </FieldGroup>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <FieldGroup label="Address Line 1" name="address_line_1" error={errors.address_line_1}>
                                            <Input id="address_line_1" placeholder="Address Line 1" value={data.address_line_1} onChange={(e) => setData('address_line_1', e.target.value)} />
                                        </FieldGroup>
                                    </div>

                                    <div className="mt-5">
                                        <FieldGroup label="Address Line 2" name="address_line_2" error={errors.address_line_2}>
                                            <Input id="address_line_2" placeholder="Address Line 2" value={data.address_line_2} onChange={(e) => setData('address_line_2', e.target.value)} />
                                        </FieldGroup>
                                    </div>

                                    <div className="mt-5 gap-x-5 md:flex md:items-center">
                                        <div className="w-full">
                                            <FieldGroup label="City" name="city" error={errors.city}>
                                                <Input id="city" placeholder="City" value={data.city} onChange={(e) => setData('city', e.target.value)} />
                                            </FieldGroup>
                                        </div>
                                        <div className="mt-5 w-full md:mt-0">
                                            <FieldGroup label="Postal Code" name="postal_code" error={errors.postal_code}>
                                                <Input id="postal_code" placeholder="Postal Code" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} />
                                            </FieldGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Payment Method */}
                            <div className="mt-10">
                                <Typography as="h3" className="mb-5">
                                    {t('checkout.payment')}
                                </Typography>

                                <RadioGroup onValueChange={(e) => setData('payment_method', e)} defaultValue={data.payment_method} className="flex w-full flex-col items-center gap-3 md:flex-row">
                                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                                        <Card className="w-full !rounded-md !border-gray-400" key={paymentMethodIdx}>
                                            <CardContent>
                                                <div className="flex w-full items-center space-x-2">
                                                    <RadioGroupItem value={paymentMethod.id} id={`payment_method_${paymentMethod.id}`} />
                                                    <Label htmlFor={`payment_method_${paymentMethod.id}`}>{paymentMethod.title} </Label>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </RadioGroup>
                                {errors.payment_method && <div className="mt-2 text-sm text-red-500">{errors.payment_method}</div>}
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="mt-10 lg:mt-0">
                            <Typography as="h3" className="mb-5">
                                {t('checkout.order_summary')}
                            </Typography>

                            <Card className={'!border-gray-50 !rounded-md'}>
                                <CardContent>
                                    <ProductsList cart={cart} />

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
        </>
    );
};

CheckoutIndex.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default CheckoutIndex;
