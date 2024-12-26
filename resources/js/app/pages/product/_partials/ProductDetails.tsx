import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';
import PhotoSlider from '@/app/pages/product/_partials/PhotoSlider';
import { PageProps } from '@/app/types';
import { Link, usePage } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import VariationValueData = App.Data.VariationValueData;
import ProductVariationData = App.Data.ProductVariationData;

const ProductDetails = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    const { t } = useTranslation();

    const cart = usePage<PageProps<{ cart?: App.Data.CartData }>>().props.cart;

    const [selectedVariation, setSelectedVariation] = useState<string | null>(product?.variations?.[1]?.variations?.[0]?.id.toString() ?? null);
    const [itemQuantity, setItemQuantity] = useState(1);

    const matchingVariation = product?.variations?.find((variation: ProductVariationData) =>
        variation?.variations?.some((variationDetail: VariationValueData) => variationDetail?.pivot?.variation_value_id == selectedVariation),
    );

    return (
        <section className="container mt-5 sm:mt-10">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <PhotoSlider product={product} />
                </div>
                <div className="mt-7 lg:mt-0">
                    <Typography as="h2">{product.name}</Typography>
                    <Typography as="p" className="mt-5">
                        {product.description}
                    </Typography>

                    <Typography as="h2" className="mt-7 !text-3xl !font-bold">
                        ${matchingVariation?.price ?? product.price}
                    </Typography>

                    <Typography as="p" className="mt-7">
                        {t('enums.product.free_shipping_over')} $100
                    </Typography>

                    {product?.grouped_variations && (
                        <div className="mt-7">
                            <ToggleGroup type="single" className="justify-start" value={selectedVariation ?? undefined} onValueChange={(value) => setSelectedVariation(value)}>
                                {Object.keys(product?.grouped_variations ?? {}).map((group) => (
                                    <div key={group} className={'flex flex-col flex-wrap space-y-1'}>
                                        <Typography as="h4"> {group} </Typography>
                                        <div className={'flex gap-2'}>
                                            {product?.grouped_variations[group].map((variation: VariationValueData) => (
                                                <ToggleGroupItem variant="default" value={variation.id.toString()} aria-label="Toggle bold" key={variation.id}>
                                                    {variation.value}
                                                </ToggleGroupItem>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </ToggleGroup>
                        </div>
                    )}

                    <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-center">
                        <div className="flex items-center">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setItemQuantity((q) => (q > 1 ? q - 1 : q));
                                }}
                            >
                                <Minus />
                            </Button>
                            <span className="mx-3 text-2xl font-semibold">{itemQuantity}</span>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={itemQuantity >= (product?.stock ?? 99)}
                                onClick={() => {
                                    setItemQuantity((q) => q + 1);
                                }}
                            >
                                <Plus />
                            </Button>
                        </div>

                        <AddToCartButton
                            product={product}
                            productVariantId={selectedVariation}
                            quantity={itemQuantity}
                            disabled={Object.keys(product?.variations ?? [])?.length > 0 && !selectedVariation}
                            variant="default"
                            className="inline-flex w-full items-center justify-center"
                        />

                        <Button asChild={cart && (cart?.products ?? []).length > 0} disabled={!cart || (cart?.products ?? []).length === 0} className={'flex w-full'}>
                            {!cart || cart?.products?.length === 0 ? 'Checkout' : <Link href={route('checkout.show')}>Checkout</Link>}
                        </Button>
                    </div>

                    <div className="mt-7">
                        <Accordion type="single" collapsible defaultValue="item-1">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <Typography as="h4" className="mt-0">
                                        Description
                                    </Typography>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Typography as="p" className="mt-0">
                                        {product.description}
                                    </Typography>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        {Object.entries((product?.grouped_attributes as Record<string, App.Data.AttributeValueData[]>) || {}).map(([group, attributes]) => (
                            <Accordion type="single" collapsible key={group}>
                                <AccordionItem value={group}>
                                    <AccordionTrigger>
                                        <Typography as="h4" className="mt-0">
                                            {group}
                                        </Typography>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {attributes.map((attribute: App.Data.AttributeValueData) => (
                                            <Typography as="p" className="mt-0" key={attribute.id}>
                                                {Array.isArray(attribute.value) ? attribute.value.join(' | ') : attribute.value}{' '}
                                            </Typography>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
