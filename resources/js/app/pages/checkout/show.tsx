import Checkbox from '@/app/components/Checkbox';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import FieldGroup from '@/app/components/ui/FieldGroup';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Textarea } from '@/app/components/ui/textarea';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductsList from '@/app/pages/checkout/_partials/ProductsList';
import { PageProps } from '@/app/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEventHandler, ReactNode, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const CheckoutIndex = () => {
    const { t } = useTranslation();

    const cart = usePage<PageProps<{ cart: App.Data.CartData }>>().props.cart;
    const global = usePage<PageProps<{ global: App.Data.GlobalData }>>().props.global;

    const [loading, setLoading] = useState<boolean>(false);
    const [redirecting, setRedirecting] = useState<boolean>(false);
    const [paymentData, setPaymentData] = useState<Record<string, string> | null>(null);

    const paymentForm = useRef<HTMLFormElement>(null);

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
        payment_method: '',
        note: '',
        terms: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        setLoading(true);

        post(route('orders.store'), {
            preserveScroll: 'errors',
            onSuccess: (response) => {
                setLoading(false);
                if (response?.props?.payment?.pay_with_card && response?.props?.payment?.paymentData) {
                    setLoading(true);
                    setRedirecting(true);

                    toast(t('checkout.actions.redirect.title'), {
                        description: t('checkout.actions.redirect.description'),
                        duration: 300000,
                    });

                    setPaymentData(response.props.payment.paymentData);

                    setTimeout(() => {
                        paymentForm.current?.submit();
                    });
                }
            },
            onError: () => {
                setLoading(false);
            },
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
            note: '',
            terms: 1,
        });
    };

    return (
        <>
            <Head title={t('checkout.checkout')} />

            <div className="relative container lg:max-w-6xl">
                {redirecting ? <span className={`bg-background/50 absolute inset-0 z-20`}></span> : ''}
                <div className="py-7 lg:pt-20">
                    <h2 className="sr-only">{t('checkout.checkout')}</h2>

                    {/*{global?.env === 'local' && (*/}
                    {/*    <Button variant={'outlined-white'} type={'button'} onClick={fillWithTestData} className={`absolute top-4`}>*/}
                    {/*        {t('checkout.fill_with_test_data')}*/}
                    {/*    </Button>*/}
                    {/*)}*/}

                    {paymentData && (
                        <form
                            ref={paymentForm}
                            action={global?.env === 'production' ? import.meta.env.VITE_NESTPAY_MERCHANT_3DGATE_URL_PRODUCTION : import.meta.env.VITE_NESTPAY_MERCHANT_3DGATE_URL}
                            method="POST"
                            className="hidden"
                        >
                            {Object.entries(paymentData).map(([key, value]) => (
                                <input key={key} type="text" name={key} value={value ?? ''} readOnly={true} />
                            ))}
                        </form>
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
                                <div className={`flex flex-col space-y-1`}>
                                    <div className={`flex space-x-1`}>
                                        <Typography as="h4">{t('checkout.shipping_info')}</Typography>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button type={`button`} className={`text-primary flex items-baseline space-x-1 underline`}>
                                                    <span className={`sr-only`}>{t('shipping_information.title')}</span>
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                                                            fill="currentColor"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>{t('shipping_information.title')}</DialogTitle>
                                                    <DialogDescription className={`flex items-center space-x-1`}></DialogDescription>
                                                </DialogHeader>

                                                <ul className={`prose-sm list-decimal pl-6`}>
                                                    <li>{t('shipping_information.paragraph1')}</li>
                                                    <li>{t('shipping_information.paragraph2')}</li>
                                                    <li>{t('shipping_information.paragraph3')}</li>
                                                    <li>{t('shipping_information.paragraph4')}</li>
                                                    <li>{t('shipping_information.paragraph5')}</li>
                                                </ul>
                                                <p className={`text-sm font-medium`}>
                                                    <span className={`text-red-400`}>*</span>
                                                    {t('shipping_information.description')}
                                                </p>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    <Typography as="p" className="text-muted-foreground flex items-center gap-x-1 text-xs sm:text-xs">
                                        <motion.span initial={{ y: 50 }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
                                            <svg className={`size-4`} viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.9375 22.75C9.87403 22.7498 10.7819 23.0732 11.5074 23.6654C12.2329 24.2577 12.7314 25.0824 12.9187 26H24.375V9.75H6.5C5.63805 9.75 4.8114 10.0924 4.2019 10.7019C3.59241 11.3114 3.25 12.138 3.25 13V26H4.95625C5.14356 25.0824 5.64215 24.2577 6.36764 23.6654C7.09314 23.0732 8.00097 22.7498 8.9375 22.75ZM8.9375 30.875C8.00097 30.8752 7.09314 30.5518 6.36764 29.9596C5.64215 29.3673 5.14356 28.5426 4.95625 27.625H1.625V13C1.625 11.7071 2.13861 10.4671 3.05285 9.55285C3.96709 8.63861 5.20707 8.125 6.5 8.125H24.375C24.806 8.125 25.2193 8.29621 25.524 8.60095C25.8288 8.9057 26 9.31902 26 9.75V13H30.875L35.75 19.5V27.625H32.4188C32.2323 28.5434 31.734 29.369 31.0085 29.9621C30.2829 30.5551 29.3746 30.8791 28.4375 30.8791C27.5004 30.8791 26.5921 30.5551 25.8665 29.9621C25.141 29.369 24.6427 28.5434 24.4563 27.625H12.9187C12.7314 28.5426 12.2329 29.3673 11.5074 29.9596C10.7819 30.5518 9.87403 30.8752 8.9375 30.875ZM8.9375 24.375C8.29103 24.375 7.67105 24.6318 7.21393 25.0889C6.75681 25.546 6.5 26.166 6.5 26.8125C6.5 27.459 6.75681 28.079 7.21393 28.5361C7.67105 28.9932 8.29103 29.25 8.9375 29.25C9.58397 29.25 10.204 28.9932 10.6611 28.5361C11.1182 28.079 11.375 27.459 11.375 26.8125C11.375 26.166 11.1182 25.546 10.6611 25.0889C10.204 24.6318 9.58397 24.375 8.9375 24.375ZM28.4375 22.75C29.374 22.7498 30.2819 23.0732 31.0074 23.6654C31.7329 24.2577 32.2314 25.0824 32.4188 26H34.125V20.02L33.735 19.5H26V23.5625C26.6825 23.0588 27.5275 22.75 28.4375 22.75ZM28.4375 24.375C27.791 24.375 27.171 24.6318 26.7139 25.0889C26.2568 25.546 26 26.166 26 26.8125C26 27.459 26.2568 28.079 26.7139 28.5361C27.171 28.9932 27.791 29.25 28.4375 29.25C29.084 29.25 29.704 28.9932 30.1611 28.5361C30.6182 28.079 30.875 27.459 30.875 26.8125C30.875 26.166 30.6182 25.546 30.1611 25.0889C29.704 24.6318 29.084 24.375 28.4375 24.375ZM26 14.625V17.875H32.5L30.0625 14.625H26Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </motion.span>
                                        <motion.span initial={{ y: 50 }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }}>
                                            {t('product.free_shipping_over')} 5,000rsd
                                        </motion.span>
                                    </Typography>
                                </div>

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
                                            <FieldGroup label={t('checkout.form.labels.city')} name="city" error={errors.city} required>
                                                <Input id="city" placeholder={t('checkout.form.placeholders.city')} value={data.city} onChange={(e) => setData('city', e.target.value)} />
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

                                    <FieldGroup label={t('checkout.form.labels.note')} name="note" error={errors.note}>
                                        <Textarea id="address" placeholder={t('checkout.form.placeholders.note')} value={data.note} onChange={(e) => setData('note', e.target.value)} />
                                    </FieldGroup>

                                    <div>
                                        <div className={`relative space-x-2`}>
                                            <Checkbox id="terms" value={data.terms} onChange={(e) => setData('terms', e.target.checked ? 1 : 0)} />
                                            <Label htmlFor={`terms`} className={`relative top-0.5 space-x-1 text-sm font-normal`}>
                                                <span className="text-red-400">*</span>
                                                <span className={`inline-block`}>{t('checkout.form.labels.terms')}</span>
                                                <a href={route('page.terms.show')} target={`_blank`} className={`text-primary underline`}>
                                                    {t('checkout.terms_and_conditions')}
                                                </a>
                                            </Label>
                                            {errors?.terms && <div className="absolute -bottom-5 left-2 text-xs text-red-500">{errors.terms}</div>}
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
                                        <Button type="submit" className="block h-12 w-full uppercase" disabled={loading}>
                                            {t('checkout.actions.confirm')}
                                        </Button>
                                    </div>

                                    <p className={`text-muted-foreground mt-2 px-2 text-xs`}>
                                        <span className={`text-red-400`}>*</span>
                                        {t('checkout.additional.tax_disclaimer')}
                                    </p>
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
