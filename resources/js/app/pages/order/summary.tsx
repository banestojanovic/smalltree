import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Badge } from '@/app/components/ui/badge';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PageProps } from '@/app/types';
import { useTranslation } from 'react-i18next';

const OrderSummaryPage = () => {
    const { t } = useTranslation();
    const order = usePage<PageProps<{ order: App.Data.OrderData }>>().props.order;

    console.log(order);

    return (
        <>
            <Head title={t('order.order_summary')} />
            <div className="container">
                <div className="bg-white">
                    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <div className="max-w-xl">
                            <Typography as="h4">{t('order.thank_you')}</Typography>

                            <Typography as="h2" className="!text-5xl">
                                {t('order.its_on_the_way')}
                            </Typography>
                            <Typography as="p" className="">
                                {t('order.order_received')}
                            </Typography>

                            <dl className="mt-12 text-sm font-medium">
                                <dt className="text-gray-900">Order number</dt>
                                <dd className="mt-2 text-indigo-600">{order.id}</dd>
                            </dl>
                        </div>

                        <div className="mt-10 border-t border-gray-200">
                            <h2 className="sr-only">Your order</h2>

                            <h3 className="sr-only">Items</h3>
                            {order?.items?.map(
                                (item) =>
                                    item?.product && (
                                        <div key={item.id} className="flex space-x-6 border-b border-gray-200 py-10">
                                            {item?.product?.cover?.original_url && (
                                                <img
                                                    src={item?.product.cover?.original_url}
                                                    alt={item?.product.name}
                                                    className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                                                />
                                            )}
                                            <div className="flex flex-auto flex-col">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">
                                                        <Link href={route('products.show', item?.product?.slug)}>{item.product.name}</Link>
                                                    </h4>
                                                    <p className="mt-2 text-sm text-gray-600">{item.product.description}</p>
                                                </div>
                                                <div className="mt-6 flex flex-1 items-end">
                                                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                                                        <div className="flex">
                                                            <dt className="font-medium text-gray-900">Quantity</dt>
                                                            <dd className="ml-2 text-gray-700">{item.quantity}</dd>
                                                        </div>
                                                        <div className="flex pl-4 sm:pl-6">
                                                            <dt className="font-medium text-gray-900">Price</dt>
                                                            <dd className="ml-2 text-gray-700">${item.price}</dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                            )}

                            <div className="sm:ml-40 sm:pl-6">
                                <h3 className="sr-only">Your information</h3>

                                <h4 className="sr-only">Addresses</h4>
                                <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                                    <div>
                                        <dt className="font-medium text-gray-900">{t('order.shipping_address')}</dt>
                                        <dd className="mt-2 text-gray-700">
                                            <address className="not-italic">
                                                <span className="block">{order?.user?.name}</span>
                                                <span className="block">
                                                    {order.shipping_address?.address_line_1} {order.shipping_address?.address_line_2}
                                                </span>
                                                <span className="block">
                                                    {order.shipping_address?.city} {order.shipping_address?.postal_code}
                                                </span>
                                            </address>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-900">{t('order.payment_method')}</dt>
                                        <dd className="mt-2 text-gray-700">
                                            <p>Cash on delivery</p>
                                        </dd>
                                    </div>
                                </dl>

                                <h3 className="sr-only">Summary</h3>

                                <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="font-medium text-gray-900">{t('order.subtotal')}</dt>
                                        <dd className="text-gray-700">${order.amount}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="font-medium text-gray-900">{t('order.shipping')}</dt>
                                        <dd className="text-gray-700">${order.shipping}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="font-medium text-gray-900">{t('order.total')}</dt>
                                        <dd className="text-gray-900">${order.total}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

OrderSummaryPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default OrderSummaryPage;
