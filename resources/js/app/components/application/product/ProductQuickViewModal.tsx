import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Typography } from '@/app/components/ui/typography';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import { useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group';
import VariationValueData = App.Data.VariationValueData;
import ProductVariationData = App.Data.ProductVariationData;

export function ProductQuickViewModal({ product }: { product: App.Data.ProductData }) {
    const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

    useEffect(() => {
        if (product?.grouped_variations) {
            // Find the first group and select the second variation in that group
            const firstGroup = Object.keys(product.grouped_variations)[0];
            if (firstGroup && product.grouped_variations[firstGroup]?.[1]) {
                setSelectedVariation(product.grouped_variations[firstGroup][1]?.id.toString());
            }
        }
    }, [product]);

    const matchingVariation = product?.variations?.find((variation: ProductVariationData) =>
        variation?.variations?.some((variationDetail: VariationValueData) => variationDetail?.pivot?.variation_value_id == selectedVariation),
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="circle" variant="secondary">
                    <span>
                        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.07771 23.1429C1.48543 23.1429 0.991285 22.9449 0.595285 22.5489C0.199285 22.1529 0.000857143 21.6587 0 21.0664V7.21929C0 6.62786 0.198428 6.13414 0.595285 5.73814C0.992143 5.34214 1.48629 5.14371 2.07771 5.14286H4.5V4.5C4.5 3.25029 4.93757 2.18786 5.81271 1.31271C6.68786 0.437571 7.75029 0 9 0C10.2497 0 11.3121 0.437571 12.1873 1.31271C13.0624 2.18786 13.5 3.25029 13.5 4.5V5.14286H15.9236C16.515 5.14286 17.0087 5.34129 17.4047 5.73814C17.8007 6.135 17.9991 6.62914 18 7.22057V21.0664C18 21.6579 17.8016 22.152 17.4047 22.5489C17.0079 22.9457 16.5141 23.1437 15.9236 23.1429H2.07771ZM2.07771 21.8571H15.9236C16.1207 21.8571 16.302 21.7749 16.4674 21.6103C16.6329 21.4457 16.7151 21.264 16.7143 21.0651V7.22057C16.7143 7.02257 16.632 6.84086 16.4674 6.67543C16.3029 6.51 16.1211 6.42771 15.9223 6.42857H13.5V9.64286C13.5 9.82629 13.4387 9.97929 13.3161 10.1019C13.1936 10.2244 13.0406 10.2857 12.8571 10.2857C12.6737 10.2857 12.5207 10.2244 12.3981 10.1019C12.2756 9.97929 12.2143 9.82629 12.2143 9.64286V6.42857H5.78571V9.64286C5.78571 9.82629 5.72443 9.97929 5.60186 10.1019C5.47929 10.2244 5.32629 10.2857 5.14286 10.2857C4.95943 10.2857 4.80643 10.2244 4.68386 10.1019C4.56129 9.97929 4.5 9.82629 4.5 9.64286V6.42857H2.07771C1.87971 6.42857 1.698 6.51086 1.53257 6.67543C1.36714 6.84 1.28486 7.02171 1.28571 7.22057V21.0664C1.28571 21.2636 1.368 21.4449 1.53257 21.6103C1.69714 21.7757 1.87843 21.858 2.07643 21.8571M5.78571 5.14286H12.2143V4.5C12.2143 3.59486 11.9049 2.83286 11.286 2.214C10.6671 1.59514 9.90514 1.28571 9 1.28571C8.09486 1.28571 7.33286 1.59514 6.714 2.214C6.09514 2.83286 5.78571 3.59486 5.78571 4.5V5.14286Z"
                                fill="#5E5E5E"
                            />
                        </svg>
                    </span>
                </Button>
            </DialogTrigger>

            <DialogHeader>
                <DialogTitle className={'sr-only'}>Product Variations</DialogTitle>
                <DialogDescription className={'sr-only'}>Product Variations</DialogDescription>
            </DialogHeader>

            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-[40%_auto]">
                    <section>
                        <img className="h-60 w-full rounded-lg object-cover sm:aspect-auto sm:size-80 sm:h-80 sm:w-auto" src={product.cover.original_url} alt="" />
                    </section>
                    <section>
                        <Typography as="h3"> {product.name}</Typography>
                        <Typography as="h4"> {matchingVariation?.price ?? product?.price} RSD</Typography>

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
