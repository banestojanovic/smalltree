import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import useNumberFormatter from '@/functions';
import { useTranslation } from 'react-i18next';

const OrderSummaryPage = ({ order }: { order: App.Data.OrderData }) => {
    const { t } = useTranslation();
    const formatNumber = useNumberFormatter();

    return (
        <>
            <Head title={t('order.order_summary')} />
            <div className="container">
                <div className="mt-5 md:mt-10">
                    <div className="mx-auto max-w-3xl">
                        <div className="max-w-xl space-y-2 md:space-y-4">
                            <Typography as="p" className={`text-primary text-sm font-medium uppercase sm:text-sm`}>
                                {t('order.summary.top_title')}
                            </Typography>

                            <Typography as="h2" className="max-sm:font-semibold sm:text-5xl">
                                {t('order.summary.title')}
                            </Typography>
                            <Typography as="p" className={`text-foreground/60`}>
                                {t('order.summary.subtitle')}
                            </Typography>
                        </div>

                        <div>
                            <dl className="mt-12 text-sm font-medium">
                                <dt className="">{t('order.summary.order_number')}</dt>
                                <dd className="text-primary mt-2">#{order.id}</dd>
                            </dl>
                        </div>

                        <div className="mt-10 border-t border-gray-200">
                            <h2 className="sr-only">{t('order.summary.your_order')}</h2>

                            <h3 className="sr-only">{t('order.summary.products')}</h3>
                            {order?.items?.map(
                                (item) =>
                                    item?.product && (
                                        <div key={item.id} className="flex space-x-6 py-10">
                                            {item?.product?.cover?.original_url && (
                                                <img
                                                    src={item?.product.cover?.original_url}
                                                    alt={item?.product.name}
                                                    className="size-20 flex-none rounded-lg bg-white object-contain object-center sm:h-40 sm:w-40"
                                                />
                                            )}
                                            <div className="flex flex-auto flex-col">
                                                <div>
                                                    <h4 className="font-title text-xl font-medium hover:underline">
                                                        <Link href={route('products.show', item?.product?.slug)}>{item.product.name}</Link>
                                                    </h4>
                                                    <p className="mt-2 text-sm">{item.product.description}</p>
                                                </div>
                                                <div className="mt-6 flex flex-1 items-end">
                                                    <dl className="xxs:flex-row xxs:divide-x flex flex-col gap-1 space-x-1 text-sm sm:space-x-4">
                                                        <div className="xxs:pr-2 flex sm:pr-6">
                                                            <dt className="font-medium">{t('order.summary.quantity')}:</dt>
                                                            <dd className="ml-2">{item.quantity}</dd>
                                                        </div>
                                                        <div className="flex">
                                                            <dt className="font-medium">{t('order.summary.price')}:</dt>
                                                            <dd className="xxs:flex-row xxs:space-x-2 ml-2 flex flex-col gap-1">
                                                                <span>{formatNumber(item.price * item.quantity)}rsd</span>
                                                                {item.price !== item.real_price && (
                                                                    <span className={`text-muted-foreground line-through`}>{formatNumber(item.real_price * item.quantity)}rsd</span>
                                                                )}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                            )}

                            <div className="sm:ml-40 sm:pl-6">
                                <h3 className="sr-only">{t('order.summary.your_information')}</h3>

                                <h4 className="sr-only">{t('order.summary.addresses')}</h4>
                                <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                                    <div>
                                        <dt className="font-medium">{t('order.shipping_address')}</dt>
                                        <dd className="mt-2">
                                            <address className="space-y-1 not-italic">
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
                                        <dt className="font-medium">{t('order.payment_method')}</dt>
                                        <dd className="mt-2">
                                            <p>{order.payment_method_label}</p>
                                        </dd>
                                    </div>
                                </dl>

                                <h3 className="sr-only">{t('order.summary.summary')}</h3>

                                <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="font-medium">{t('order.subtotal')}</dt>
                                        <dd>{formatNumber(order?.amount ?? 0)}rsd</dd>
                                    </div>
                                    {order?.shipping > 0 && (
                                        <div className="flex justify-between">
                                            <dt className="font-medium">{t('order.shipping')}</dt>
                                            <dd>{formatNumber(order?.shipping ?? 0)}rsd</dd>
                                        </div>
                                    )}
                                    {order?.discount > 0 && (
                                        <div className="flex justify-between">
                                            <dt className="font-medium">{t('order.discount')}</dt>
                                            <dd>{formatNumber(order?.discount ?? 0)}rsd</dd>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <dt className="font-medium">{t('order.tax')}</dt>
                                        <dd>20%</dd>
                                    </div>
                                    <div className="flex justify-between text-xl">
                                        <dt className="font-medium">{t('order.total')}</dt>
                                        <dd>{formatNumber(order.total)}rsd</dd>
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
