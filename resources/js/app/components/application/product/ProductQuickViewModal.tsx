import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Typography } from '@/app/components/ui/typography';
import { ShoppingCart } from 'lucide-react';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group';

export function ProductQuickViewModal({ product }: { product?: App.Data.ProductData }) {
    const [selectedVariation, setSelectedVariation] = useState();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <ShoppingCart />
                </Button>
            </DialogTrigger>

            <DialogHeader>
                <DialogTitle></DialogTitle>
            </DialogHeader>

            <DialogContent className="sm:max-w-[600px]">
                <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-[40%_auto]">
                    <section>
                        <img className="h-60 w-full rounded-lg object-contain sm:aspect-auto sm:size-80 sm:h-80 sm:w-auto" src={product.cover.original_url} alt="" />
                    </section>
                    <section>
                        <Typography as="h3"> {product.name}</Typography>
                        <Typography as="h4"> ${product.price}</Typography>

                        <Typography as="p" className="mt-1">
                            {product.description}
                        </Typography>

                        <div className="mt-7">
                            <Typography as="h4"> Variations: </Typography>
                            <ToggleGroup type="single" className="!justify-start" value={selectedVariation} onValueChange={(value) => setSelectedVariation(value)}>
                                {product.variations?.map((variation) => (
                                    <ToggleGroupItem variant="default" value={variation.id} aria-label="Toggle bold" key={variation.id}>
                                        {variation.sku}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>

                        <div className="mt-5">
                            <AddToCartButton variant="default" className="inline-flex w-full items-center justify-center" productVariantId={selectedVariation} product={product} />
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}
