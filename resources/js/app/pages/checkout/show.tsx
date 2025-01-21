import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import FieldGroup from '@/app/components/ui/FieldGroup';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductsList from '@/app/pages/checkout/_partials/ProductsList';
import { PageProps } from '@/app/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const CheckoutIndex = () => {
    const { t } = useTranslation();

    const cart = usePage<PageProps<{ cart: App.Data.CartData }>>().props.cart;
    const global = usePage<PageProps<{ global: App.Data.GlobalData }>>().props.global;

    const paymentMethods = [
        { id: '1', title: t('checkout.payment_methods.credit_card') },
        { id: '2', title: t('checkout.payment_methods.upon_delivery') },
    ];

    const { data, setData, post, errors } = useForm({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        address: '',
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
            address: '123 Test Street',
            city: 'Test City',
            postal_code: '12345',
            payment_method: '2',
        });
    };

    return (
        <>
            <Head title={t('checkout.checkout')} />

            <div className="container relative lg:max-w-6xl">
                <div className="py-7 lg:pt-20">
                    <h2 className="sr-only">{t('checkout.checkout')}</h2>

                    {global?.env === 'local' && (
                        <Button variant={'outlined-white'} type={'button'} onClick={fillWithTestData} className={`absolute top-4`}>
                            {t('checkout.fill_with_test_data')}
                        </Button>
                    )}

                    <form onSubmit={submit} className="grid gap-10 md:gap-20 lg:grid-cols-2">
                        <div className={`space-y-10`}>
                            <div className={`space-y-3.5 md:space-y-7`}>
                                <Typography as="h4">{t('checkout.contact_info')}</Typography>

                                <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-1`}>
                                    <FieldGroup label={t('checkout.form.labels.email')} name="email" error={errors.email} required>
                                        <Input id="email" type="email" placeholder={t('checkout.form.placeholders.email')} value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    </FieldGroup>

                                    <FieldGroup label={t('checkout.form.labels.phone')} name="phone" error={errors.phone} required>
                                        <Input id="phone" placeholder={t('checkout.form.placeholders.phone')} value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    </FieldGroup>
                                </div>
                            </div>

                            <div className={`space-y-3.5 md:space-y-7`}>
                                <Typography as="h4">{t('checkout.shipping_info')}</Typography>

                                <div className={`space-y-7`}>
                                    <div className="grid gap-6 md:flex md:items-center">
                                        <div className="w-full">
                                            <FieldGroup label={t('checkout.form.labels.first_name')} name="first_name" error={errors.first_name} required>
                                                <Input
                                                    id="first_name"
                                                    placeholder={t('checkout.form.placeholders.first_name')}
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                />
                                            </FieldGroup>
                                        </div>

                                        <div className="w-full">
                                            <FieldGroup label={t('checkout.form.labels.last_name')} name="last_name" error={errors.last_name} required>
                                                <Input
                                                    id="last_name"
                                                    placeholder={t('checkout.form.placeholders.last_name')}
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                />
                                            </FieldGroup>
                                        </div>
                                    </div>

                                    <FieldGroup label={t('checkout.form.labels.address')} name="address" error={errors.address} required>
                                        <Input id="address" placeholder={t('checkout.form.placeholders.address')} value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                    </FieldGroup>

                                    <div className="grid gap-7 md:flex md:items-center">
                                        <div className="w-full">
                                            <FieldGroup label="City" name="city" error={errors.city} required>
                                                <Input id="city" placeholder="City" value={data.city} onChange={(e) => setData('city', e.target.value)} />
                                            </FieldGroup>
                                        </div>
                                        <div className="w-full">
                                            <FieldGroup label={t('checkout.form.labels.postal_code')} name="postal_code" error={errors.postal_code} required>
                                                <Input
                                                    id="postal_code"
                                                    placeholder={t('checkout.form.placeholders.postal_code')}
                                                    value={data.postal_code}
                                                    onChange={(e) => setData('postal_code', e.target.value)}
                                                />
                                            </FieldGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`space-y-3.5 md:space-y-7`}>
                                <Typography as="h4">{t('checkout.payment_method')}</Typography>

                                <RadioGroup onValueChange={(value) => setData('payment_method', value)} value={data.payment_method} className="flex w-full flex-col items-center md:flex-row md:gap-7">
                                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                                        <Button asChild variant="outlined-white" key={paymentMethodIdx} className={`h-12 w-full justify-start px-6`}>
                                            <div className={`relative`}>
                                                <RadioGroupItem value={paymentMethod.id} id={`payment_method_${paymentMethod.id}`} />
                                                <Label htmlFor={`payment_method_${paymentMethod.id}`} className={`absolute inset-0 cursor-pointer opacity-0`}>
                                                    <span className={`sr-only`}>{paymentMethod.title}</span>
                                                </Label>
                                                <span>{paymentMethod.title}</span>
                                            </div>
                                        </Button>
                                    ))}
                                </RadioGroup>
                                {errors.payment_method && <div className="mt-2 text-sm text-red-500">{errors.payment_method}</div>}
                            </div>
                        </div>

                        <div className={`space-y-3.5 md:space-y-7`}>
                            <Typography as="h4">{t('checkout.order_summary')}</Typography>

                            <Card className={'rounded-md border-none shadow-none'}>
                                <CardContent className={`p-2 md:p-10`}>
                                    <ProductsList cart={cart} />

                                    <div className={`mt-10`}>
                                        <Button type="submit" className="block h-12 w-full uppercase">
                                            {t('checkout.actions.confirm')}
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
