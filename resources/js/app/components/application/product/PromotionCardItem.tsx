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
        <div>
            <Typography as="h3" className="text-lg/7 text-white sm:text-xl">
                <div>{product.name}</div>
            </Typography>

            <Typography as="h3" className="font-normal! text-white">
                <ProductPrice price={product?.price ?? 0} discountPrice={product?.discount?.price ?? null} variant={`light`} />
            </Typography>
        </div>
    </div>
);

export default PromotionCardItem;
