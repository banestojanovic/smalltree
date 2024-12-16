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
import Pagination from '@/app/components/ui/pagination';
import { Typography } from '@/app/components/ui/typography';
import PromotionProduct from '@/app/pages/category/_partials/PromotionProduct';
import { PaginatedData } from '@/app/types';
import { ShoppingCart } from 'lucide-react';

const RelatedProducts = () => {
    const { t } = useTranslation();

    const { products } = usePage<{
        products: PaginatedData<App.Data.ProductData>;
    }>().props;

    const { data, links } = products;

    return (
        <section className="mt-10">
            <div className="container">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="col-span-2">
                        <PromotionProduct />
                    </div>
                    {data && data.length > 0 ? (
                        data.map((product: App.Data.ProductData) => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <Link
                                        href={route(
                                            'products.show',
                                            product.slug,
                                        )}
                                    >
                                        <img
                                            className="h-28 w-full rounded-t-lg object-cover sm:h-40 sm:h-60"
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

                <div className="mt-10 flex items-center justify-center">
                    {/*<Button>{t('enums.homepage.sections.see_all')}</Button>*/}
                    <Pagination links={links} />
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
