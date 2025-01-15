import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import ProductPrice from '@/app/components/application/product/ProductPrice';
import { ProductQuickViewModal } from '@/app/components/application/product/ProductQuickViewModal';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../ui/typography';

const ProductCard = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    const { t } = useTranslation();

    return (
        <Card key={product.id} className="relative flex flex-col justify-between border-none shadow-none transition hover:scale-105">
            {product.discount && (
                <span className="absolute right-2 top-2 rounded-md bg-primary px-4 py-1.5 text-xs text-white">
                    {t('order.on_action')} {product?.discount?.percentage ? `${product.discount.percentage}%` : ''}
                </span>
            )}
            <CardHeader className="w-full pb-5">
                {product.cover?.original_url && (
                    <Link href={route('products.show', { slug: product.slug })}>
                        <img className="h-60 w-full rounded-lg object-cover p-2 sm:h-56" src={product.cover.original_url} alt={product.name} />
                    </Link>
                )}
                {product?.category && (
                    <CardDescription className={`text-sm`}>
                        <Link key={product.category.id} href={route('categories.show', product.category.slug)} className={`hover:underline`}>
                            {product.category.name}
                        </Link>
                    </CardDescription>
                )}
                <CardTitle>
                    <Typography as="h4" className={`font-normal`}>
                        <Link href={route('products.show', { slug: product.slug })}>{product.name}</Link>
                    </Typography>
                </CardTitle>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between">
                <ProductPrice product={product} />
                <div className="inline-flex items-center justify-end">
                    {product.variations && product.variations.length > 0 ? (
                        <ProductQuickViewModal product={product} />
                    ) : (
                        <AddToCartButton variant="secondary" product={product} productVariantId={null} />
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
