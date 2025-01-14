import ProductPrice from '@/app/components/application/product/ProductPrice';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';

const PromotionCardItem = ({
    product,
}: PageProps<{
    product: App.Data.ProductData;
}>) => (
    <div className="flex items-start gap-x-3">
        <div className="">
            <Avatar className="size-14 bg-white">
                <AvatarImage src={product.cover?.original_url} className="object-cover" />
                <AvatarFallback>{product.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
        </div>
        <div className="">
            <Typography as="h3" className="!text-lg !font-normal !leading-5 text-white sm:!text-2xl">
                <Link href={route('products.show', product.slug)}>{product.name}</Link>
            </Typography>

            <Typography as="h3" className="!font-normal text-white">
                <ProductPrice product={product} />
            </Typography>
        </div>
    </div>
);

export default PromotionCardItem;
