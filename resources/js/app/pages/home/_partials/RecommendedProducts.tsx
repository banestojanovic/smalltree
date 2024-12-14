import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/app/components/ui/badge';
import { PageProps } from '@/app/types';
import { ShoppingCart } from 'lucide-react';

const RecommendedProducts = () => {
    const { t } = useTranslation();
    const {
        staffRecommendedProducts,
    }: PageProps<{ staffRecommendedProducts?: App.Data.ProductData[] }> =
        usePage().props;

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0">
                    {t('enums.homepage.sections.staff_recommended')}
                </h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {staffRecommendedProducts &&
                    staffRecommendedProducts.length > 0 ? (
                        staffRecommendedProducts.map((product) => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <div className="">
                                        <img
                                            className="h-40 w-full object-cover sm:h-60"
                                            src={product.cover.original_url}
                                            alt={product.name}
                                        />
                                    </div>

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
                                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                            {product.name}
                                        </h4>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="h-40 overflow-hidden">
                                        {product.description}
                                    </p>
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
                            No products available.
                        </p>
                    )}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <Button>{t('enums.homepage.sections.see_all')}</Button>
                </div>
            </div>
        </section>
    );
};

export default RecommendedProducts;
