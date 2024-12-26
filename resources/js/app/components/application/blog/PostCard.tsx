import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/app/components/ui/badge';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';

const PostCard = ({ post }: PageProps<{ post: App.Data.PostData }>) => {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader>
                <Link href={route('posts.show', post.slug)}>
                    <img className="h-40 w-full object-cover sm:h-60" src={post.cover.original_url} alt={post.name} />
                </Link>

                <CardDescription>
                    {post.categories?.map((category: App.Data.PostCategoryData) => (
                        <Badge key={category.id} variant="outline">
                            {category.name}
                        </Badge>
                    ))}
                </CardDescription>
                <CardTitle>
                    <Link href={route('posts.show', post.slug)}>
                        <Typography as="h4">{post.name}</Typography>
                    </Link>

                    <p className="mt-1 text-sm !font-normal tracking-widest">{post.date_created}</p>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-4">{post.content}</p>
            </CardContent>

            <CardFooter className="mt-auto flex items-center">
                <Button variant="link" className="!px-0">
                    <Link href={route('posts.show', post.slug)}> {t('enums.homepage.sections.read_more')} ...</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PostCard;
