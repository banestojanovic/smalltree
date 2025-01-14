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
        <Card key={product.id} className="relative flex flex-col justify-between !border-none">
            {product.discount && (
                <span className="absolute right-2 top-2 rounded-md bg-primary px-2 py-1.5 text-sm text-white">
                    {t('order.discount')} {product.discount.percentage}%
                </span>
            )}
            <CardHeader className="w-full pb-5">
                {product.cover?.original_url && (
                    <Link href={route('products.show', { slug: product.slug })}>
                        <img className="h-60 w-full rounded-lg object-cover p-2 sm:h-56" src={product.cover.original_url} alt={product.name} />
                    </Link>
                )}
                <CardDescription>
                    {product.categories?.map((category: App.Data.CategoryData) => (
                        <Link key={category.id} href={route('categories.show', category.slug)}>
                            {category.name}
                        </Link>
                    ))}
                </CardDescription>
                <CardTitle>
                    <Typography as="h4">
                        <Link href={route('products.show', { slug: product.slug })}>{product.name}</Link>
                    </Typography>
                </CardTitle>
            </CardHeader>

            {/*<CardContent>*/}
            {/*    <p className="h-32 overflow-hidden sm:h-40">{product.description}</p>*/}
            {/*</CardContent>*/}

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
