import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/app/components/ui/badge';
import { Typography } from '@/app/components/ui/typography';
import { ShoppingCart } from 'lucide-react';

const RelatedProducts = () => {
    const { t } = useTranslation();

    const { similarProducts } = usePage<{
        similarProducts: App.Data.ProductData[];
    }>().props;

    return (
        <section className="mt-10">
            <div className="container">
                <Typography as="h3">
                    {t('enums.product.similar_products')}
                </Typography>

                <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                    {similarProducts && similarProducts.length > 0 ? (
                        similarProducts.map((product: App.Data.ProductData) => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <Link
                                        href={route(
                                            'products.show',
                                            product.slug,
                                        )}
                                    >
                                        <img
                                            className="h-28 w-full rounded-t-lg object-cover sm:h-40"
                                            src={product.cover.original_url}
                                            alt={product.name}
                                        />
                                    </Link>

                                    <CardDescription>
                                        {product.categories?.map((category) => (
                                            <Badge
                                                key={category.id}
                                                variant="outline"
                                            >
                                                {category.name}
                                            </Badge>
                                        ))}
                                    </CardDescription>
                                    <CardTitle>
                                        <Link
                                            href={route(
                                                'products.show',
                                                product.slug,
                                            )}
                                        >
                                            <Typography as="h4">
                                                {product.name}
                                            </Typography>
                                        </Link>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <Typography as="p">
                                        {product.description}
                                    </Typography>
                                </CardContent>

                                <CardFooter className="mt-auto flex items-center justify-between">
                                    <span className="font-semibold">
                                        ${product.price}
                                    </span>
                                    <Button variant="secondary" size="sm">
                                        <ShoppingCart />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            {t('enums.product.no_products_available')}.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
