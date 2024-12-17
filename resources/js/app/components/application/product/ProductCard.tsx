import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
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
                            {category.name}
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
                <p className="h-40 overflow-hidden">{product.description}</p>
            </CardContent>

            <CardFooter className="mt-auto flex items-center justify-between">
                <span className="font-semibold">${product.price}</span>
                <AddToCartButton product={product} />
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
