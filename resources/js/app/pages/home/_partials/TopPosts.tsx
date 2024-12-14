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

const PopularProducts = () => {
    const { t } = useTranslation();
    const { blogs }: PageProps<{ blogs?: App.Data.PostData[] }> =
        usePage().props;

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0">
                    {t('enums.homepage.sections.stores_with_tea')}
                </h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {blogs && blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Card key={blog.id}>
                                <CardHeader>
                                    <div className="">
                                        <img
                                            className="h-40 w-full object-cover sm:h-60"
                                            src={blog.cover.original_url}
                                            alt={blog.name}
                                        />
                                    </div>

                                    <CardDescription>
                                        {blog.categories?.map((category) => (
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
                                            {blog.name}
                                        </h4>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="line-clamp-4">
                                        {blog.content}
                                    </p>
                                </CardContent>

                                <CardFooter className="mt-auto flex items-center">
                                    <Button variant="link" className="!px-0">
                                        {t('enums.homepage.sections.read_more')}{' '}
                                        ...
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No story available.
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

export default PopularProducts;
