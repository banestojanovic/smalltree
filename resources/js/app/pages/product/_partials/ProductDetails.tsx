import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';
import PhotoSlider from '@/app/pages/product/_partials/PhotoSlider';
import { PageProps } from '@/app/types';
import { Minus, Plus } from 'lucide-react';
import VariationValueData = App.Data.VariationValueData;
import ProductVariationData = App.Data.ProductVariationData;

const ProductDetails = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    const { t } = useTranslation();

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
                <div className="">
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
                                    <div key={group} className={'flex flex-col space-y-1'}>
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

                    <div className="mt-7 flex items-center gap-x-5">
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

                        <Button className="block w-full"> Checkout </Button>
                    </div>

                    <div className="mt-7">
                        <Accordion type="single" collapsible>
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
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <Typography as="h4" className="mt-0">
                                        Features
                                    </Typography>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Typography as="p" className="mt-0">
                                        {product.description}
                                    </Typography>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    <Typography as="h4" className="mt-0">
                                        Usage
                                    </Typography>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Typography as="p" className="mt-0">
                                        {product.description}
                                    </Typography>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    <Typography as="h4" className="mt-0">
                                        Ingredients
                                    </Typography>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Typography as="p" className="mt-0">
                                        {product.description}
                                    </Typography>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
