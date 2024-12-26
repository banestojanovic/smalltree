import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import { ProductQuickViewModal } from '@/app/components/application/product/ProductQuickViewModal';
import { Badge } from '@/app/components/ui/badge';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';

const ProductCard = ({ product }: PageProps<{ product: App.Data.ProductData }>) => {
    return (
        <Card key={product.id}>
            <CardHeader>
                <Link href={route('products.show', { slug: product.slug })}>
                    <img className="h-40 w-full object-cover sm:h-60" src={product.cover.original_url} alt={product.name} />
                </Link>

                <CardDescription>
                    {product.categories?.map((category: App.Data.CategoryData) => (
                        <Badge key={category.id} variant="outline">
                            <Link href={route('categories.show', category.slug)}>{category.name}</Link>
                        </Badge>
                    ))}
                </CardDescription>
                <CardTitle>
                    <Link href={route('products.show', { slug: product.slug })}>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{product.name}</h4>
                    </Link>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="h-32 overflow-hidden sm:h-40">{product.description}</p>
            </CardContent>

            <CardFooter className="mt-auto flex items-center justify-between">
                <span className="font-semibold">${product.price}</span>
                <div className="inline-flex items-center justify-end">
                    {product.variations && product.variations.length > 0 ? <ProductQuickViewModal product={product} /> : <AddToCartButton product={product} productVariantId={null} />}
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
