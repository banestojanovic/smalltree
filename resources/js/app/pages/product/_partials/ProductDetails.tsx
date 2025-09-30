import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import ProductPrice from '@/app/components/application/product/ProductPrice';
import { Button } from '@/app/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';
import { Typography } from '@/app/components/ui/typography';
import PhotoSlider from '@/app/pages/product/_partials/PhotoSlider';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StickyBox from 'react-sticky-box';

const ProductDetails = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    const { t } = useTranslation();

    const [selectedVariation, setSelectedVariation] = useState<string | null>(product?.variations?.[1]?.variations?.[0]?.id.toString() ?? null);
    const [itemQuantity, setItemQuantity] = useState(1);

    const matchingVariation = product?.variations?.find((variation: App.Data.ProductVariationData) =>
        variation?.variations?.some((variationDetail: App.Data.VariationValueData) => variationDetail?.pivot?.variation_value_id == selectedVariation),
    );

    return (
        <section className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:gap-12">
                <div>
                    <StickyBox offsetTop={80}>
                        <PhotoSlider product={product} />
                    </StickyBox>
                </div>
                <div className="mt-7 overflow-hidden lg:mt-0">
                    <motion.div className="mb-2 flex flex-wrap items-center gap-x-3" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                        {product.categories?.map((category: App.Data.CategoryData, index) =>
                            index === 0 ? (
                                <Link key={index} href={route('categories.show', { category: category.slug })} className={`text-muted-foreground hover:text-foreground text-sm hover:underline`}>
                                    {category.name}
                                </Link>
                            ) : (
                                ''
                            ),
                        )}
                    </motion.div>
                    <Typography as="h2" className={`leading-tight sm:text-[40px]`}>
                        <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                            {product.name}
                        </motion.div>
                    </Typography>
                    <Typography as="div" className="mt-6 leading-normal sm:text-base">
                        <motion.p initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.4 }} viewport={{ once: true }}>
                            {product.description}
                        </motion.p>
                    </Typography>

                    <Typography as="div" className="mt-6 font-bold sm:text-2xl">
                        <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.6 }} viewport={{ once: true }}>
                            <ProductPrice
                                variant={'single'}
                                price={matchingVariation?.price ?? product.price ?? 0}
                                discountPrice={matchingVariation?.discount?.price ?? product?.discount?.price ?? null}
                            />
                        </motion.div>
                    </Typography>

                    {product?.stock_status === 1 && (
                        <>
                            {product?.grouped_variations && (
                                <div className="mt-10">
                                    <ToggleGroup
                                        variant="outline"
                                        type="single"
                                        className="justify-start"
                                        value={selectedVariation ?? undefined}
                                        onValueChange={(value) => setSelectedVariation(value)}
                                    >
                                        {Object.keys(product?.grouped_variations ?? {}).map((group) => (
                                            <div key={group} className={'flex flex-col flex-wrap space-y-1'}>
                                                <div className={'flex gap-2'}>
                                                    {product?.grouped_variations[group].map((variation: App.Data.VariationValueData, index: number) => (
                                                        <motion.div
                                                            key={variation.id}
                                                            initial={{ x: 50 }}
                                                            whileInView={{ x: 0 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            transition={{ type: 'spring', duration: (index + 1) / 3 }}
                                                            viewport={{ once: true }}
                                                        >
                                                            <ToggleGroupItem variant="default" value={variation.id.toString()} aria-label="Toggle bold">
                                                                {variation.value}
                                                            </ToggleGroupItem>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </ToggleGroup>
                                </div>
                            )}

                            <div className="mt-10 flex gap-2 md:gap-5 lg:items-center">
                                <div className="flex items-center gap-3 md:gap-x-5">
                                    <motion.div
                                        initial={{ x: 50 }}
                                        whileInView={{ x: 0 }}
                                        whileTap={{ scale: itemQuantity <= 1 ? 1 : 0.95 }}
                                        transition={{ type: 'spring', duration: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <Button
                                            type="button"
                                            variant="outlined-white"
                                            className={`h-11 px-3`}
                                            disabled={itemQuantity <= 1}
                                            onClick={() => {
                                                setItemQuantity((q) => (q > 1 ? q - 1 : q));
                                            }}
                                        >
                                            <Minus />
                                        </Button>
                                    </motion.div>
                                    <motion.span className="text-2xl font-semibold" initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                                        {itemQuantity}
                                    </motion.span>
                                    <motion.div
                                        initial={{ x: 50 }}
                                        whileInView={{ x: 0 }}
                                        whileTap={{ scale: itemQuantity >= (product?.stock ?? 99) ? 1 : 0.95 }}
                                        transition={{ type: 'spring', duration: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <Button
                                            type="button"
                                            variant="outlined-white"
                                            disabled={itemQuantity >= (product?.stock ?? 99)}
                                            className={`h-11 px-3`}
                                            onClick={() => {
                                                setItemQuantity((q) => q + 1);
                                            }}
                                        >
                                            <Plus />
                                        </Button>
                                    </motion.div>
                                </div>

                                <motion.div initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: 0.5 }} viewport={{ once: true }}>
                                    <AddToCartButton
                                        product={product}
                                        productVariantId={selectedVariation}
                                        quantity={itemQuantity}
                                        disabled={Object.keys(product?.variations ?? [])?.length > 0 && !selectedVariation}
                                        variant={`default`}
                                        className="flex h-11 items-center justify-center px-4 text-xs uppercase sm:text-base"
                                        iconClass={`!sm:size-5 shrink-0 fill-white`}
                                        size={`lg`}
                                        label={t('product.add_to_cart')}
                                    />
                                </motion.div>
                            </div>
                        </>
                    )}

                    <Typography as="p" className="my-16 flex items-center gap-x-2">
                        <motion.span initial={{ y: 50 }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }} viewport={{ once: true }}>
                            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.9375 22.75C9.87403 22.7498 10.7819 23.0732 11.5074 23.6654C12.2329 24.2577 12.7314 25.0824 12.9187 26H24.375V9.75H6.5C5.63805 9.75 4.8114 10.0924 4.2019 10.7019C3.59241 11.3114 3.25 12.138 3.25 13V26H4.95625C5.14356 25.0824 5.64215 24.2577 6.36764 23.6654C7.09314 23.0732 8.00097 22.7498 8.9375 22.75ZM8.9375 30.875C8.00097 30.8752 7.09314 30.5518 6.36764 29.9596C5.64215 29.3673 5.14356 28.5426 4.95625 27.625H1.625V13C1.625 11.7071 2.13861 10.4671 3.05285 9.55285C3.96709 8.63861 5.20707 8.125 6.5 8.125H24.375C24.806 8.125 25.2193 8.29621 25.524 8.60095C25.8288 8.9057 26 9.31902 26 9.75V13H30.875L35.75 19.5V27.625H32.4188C32.2323 28.5434 31.734 29.369 31.0085 29.9621C30.2829 30.5551 29.3746 30.8791 28.4375 30.8791C27.5004 30.8791 26.5921 30.5551 25.8665 29.9621C25.141 29.369 24.6427 28.5434 24.4563 27.625H12.9187C12.7314 28.5426 12.2329 29.3673 11.5074 29.9596C10.7819 30.5518 9.87403 30.8752 8.9375 30.875ZM8.9375 24.375C8.29103 24.375 7.67105 24.6318 7.21393 25.0889C6.75681 25.546 6.5 26.166 6.5 26.8125C6.5 27.459 6.75681 28.079 7.21393 28.5361C7.67105 28.9932 8.29103 29.25 8.9375 29.25C9.58397 29.25 10.204 28.9932 10.6611 28.5361C11.1182 28.079 11.375 27.459 11.375 26.8125C11.375 26.166 11.1182 25.546 10.6611 25.0889C10.204 24.6318 9.58397 24.375 8.9375 24.375ZM28.4375 22.75C29.374 22.7498 30.2819 23.0732 31.0074 23.6654C31.7329 24.2577 32.2314 25.0824 32.4188 26H34.125V20.02L33.735 19.5H26V23.5625C26.6825 23.0588 27.5275 22.75 28.4375 22.75ZM28.4375 24.375C27.791 24.375 27.171 24.6318 26.7139 25.0889C26.2568 25.546 26 26.166 26 26.8125C26 27.459 26.2568 28.079 26.7139 28.5361C27.171 28.9932 27.791 29.25 28.4375 29.25C29.084 29.25 29.704 28.9932 30.1611 28.5361C30.6182 28.079 30.875 27.459 30.875 26.8125C30.875 26.166 30.6182 25.546 30.1611 25.0889C29.704 24.6318 29.084 24.375 28.4375 24.375ZM26 14.625V17.875H32.5L30.0625 14.625H26Z"
                                    fill="black"
                                />
                            </svg>
                        </motion.span>
                        <motion.span initial={{ y: 50 }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                            {t('product.free_shipping_over')} 7,000rsd
                        </motion.span>
                    </Typography>

                    <div className="col-span-full grid gap-4 rounded sm:gap-10">
                        {Object.entries((product?.grouped_attributes as Record<string, App.Data.AttributeValueData[]>) || {}).map(([group, attributes]) => (
                            <motion.div
                                key={group}
                                className="max-xxs:space-y-2 xxs:flex-row xxs:justify-between flex w-full flex-col items-start border-b border-gray-300 pb-4"
                                initial={{ y: 50 }}
                                whileInView={{ y: 0 }}
                                transition={{ type: 'spring', duration: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Typography as="h3" className="mt-0 text-lg sm:text-lg lg:text-2xl">
                                    {group}
                                </Typography>

                                {attributes.map((attribute: App.Data.AttributeValueData) => (
                                    <Typography as="div" className="mt-0 flex items-center gap-x-2" key={attribute.id}>
                                        <div className="flex items-center justify-end gap-x-2 self-end text-right max-sm:text-xs">
                                            <span className={`max-md:[&>svg]:size-5`} dangerouslySetInnerHTML={{ __html: attribute.attribute?.icon ?? '' }} />
                                            <span className="w-full">{Array.isArray(attribute.value) ? attribute.value.join(' | ') : attribute.value} </span>
                                        </div>
                                    </Typography>
                                ))}
                            </motion.div>
                        ))}

                        {Object.entries(product?.additional || []).map(
                            ([group, value]) =>
                                value && (
                                    <motion.div
                                        key={group}
                                        className="max-xxs:space-y-2 xxs:flex-row xxs:justify-between xs:items-center flex w-full flex-col border-b border-gray-300 pb-4"
                                        initial={{ y: 50 }}
                                        whileInView={{ y: 0 }}
                                        transition={{ type: 'spring', duration: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <Typography as="h3" className="mt-0 text-lg sm:text-lg lg:text-2xl">
                                            {group}
                                        </Typography>

                                        <Typography as="div" className="mt-0 flex items-center gap-x-2">
                                            <div className="max-xs:text-xs flex items-center justify-end gap-x-2 self-start text-right">
                                                <span className="w-full">{value} </span>
                                            </div>
                                        </Typography>
                                    </motion.div>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
