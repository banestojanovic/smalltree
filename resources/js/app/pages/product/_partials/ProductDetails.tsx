import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { Button } from '@/app/components/ui/button';
import { Combobox, ComboboxItem } from '@/app/components/ui/combobox';
import { Typography } from '@/app/components/ui/typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageProps } from '@/app/types';
import { Minus, Plus } from 'lucide-react';

const ProductDetails = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    const { t } = useTranslation();

    const [selectedVariation, setSelectedVariation] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);

    return (
        <section className="container mt-5 sm:mt-10">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>Slider</div>
                <div className="">
                    <Typography as="h2">{product.name}</Typography>
                    <Typography as="p" className="mt-5">
                        {product.description}
                    </Typography>

                    <Combobox value={selectedVariation} onChange={(value) => setSelectedVariation(value)} placeholder={t('enums.product.variations')} inputPlaceholder={t('enums.product.variations')}>
                        <ComboboxItem value="v1">Variation Value 1</ComboboxItem>
                        <ComboboxItem value="v2">Variation Value 2</ComboboxItem>
                        <ComboboxItem value="v3">Variation Value 3</ComboboxItem>
                    </Combobox>

                    {/*<Combobox*/}
                    {/*    options={product?.variations ?? []}*/}
                    {/*    value={selectedVariation}*/}
                    {/*    onChange={(item) => setSelectedVariation(item.value)}*/}
                    {/*    placeholder={t('enums.product.variations')}*/}
                    {/*    inputPlaceholder={t('enums.product.variations')}*/}
                    {/*    displayLabel={(value) => <span>{value.sku}</span>}*/}
                    {/*>*/}
                    {/*    {(item) => (*/}
                    {/*        <div className="flex items-center justify-between">*/}
                    {/*            <span>{item.sku}</span>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</Combobox>*/}

                    <Typography as="h2" className="mt-7 !text-3xl !font-bold">
                        ${product.price}
                    </Typography>

                    <Typography as="p" className="mt-7">
                        {t('enums.product.free_shipping_over')} $100
                    </Typography>

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
                                onClick={() => {
                                    setItemQuantity((q) => q + 1);
                                }}
                            >
                                <Plus />
                            </Button>
                        </div>

                        <Button> Add to Cart</Button>

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
