import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Typography } from '@/app/components/ui/typography';
import { ShoppingCart } from 'lucide-react';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group';
import VariationValueData = App.Data.VariationValueData;
import ProductVariationData = App.Data.ProductVariationData;

export function ProductQuickViewModal({ product }: { product: App.Data.ProductData }) {
    const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

    const matchingVariation = product?.variations?.find((variation: ProductVariationData) =>
        variation?.variations?.some((variationDetail: VariationValueData) => variationDetail?.pivot?.variation_value_id == selectedVariation),
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <ShoppingCart />
                </Button>
            </DialogTrigger>

            <DialogHeader>
                <DialogTitle className={'sr-only'}>Product Variations</DialogTitle>
                <DialogDescription className={'sr-only'}>Product Variations</DialogDescription>
            </DialogHeader>

            <DialogContent className="sm:max-w-[600px]">
                <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-[40%_auto]">
                    <section>
                        <img className="h-60 w-full rounded-lg object-cover sm:aspect-auto sm:size-80 sm:h-80 sm:w-auto" src={product.cover.original_url} alt="" />
                    </section>
                    <section>
                        <Typography as="h3"> {product.name}</Typography>
                        <Typography as="h4"> ${matchingVariation?.price ?? product?.price}</Typography>

                        <Typography as="p" className="mt-1">
                            {product.description}
                        </Typography>

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

                        <div className="mt-5">
                            <AddToCartButton
                                disabled={!selectedVariation}
                                variant="default"
                                className="inline-flex w-full items-center justify-center"
                                productVariantId={selectedVariation}
                                product={product}
                                showPrice={true}
                            />
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}
