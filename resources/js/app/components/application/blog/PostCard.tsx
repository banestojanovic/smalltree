import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';

const PostCard = ({ post }: PageProps<{ post: App.Data.PostData }>) => {
    const { t } = useTranslation();

    return (
        <Card className={`w-full rounded-lg border-none shadow-none transition hover:scale-[1.01] hover:shadow`}>
            <CardHeader>
                {post.cover?.original_url && (
                    <Link href={route('posts.show', post.slug)} className="rounded-lg p-2.5">
                        <img className="aspect-video rounded-lg object-cover" src={post.cover.original_url} alt={post.name} />
                    </Link>
                )}
            </CardHeader>

            <CardContent className={`flex flex-col space-y-4 py-6`}>
                <CardTitle className={`px-0`}>
                    <Typography as="h4" className={`font-normal`}>
                        <Link href={route('posts.show', post.slug)}>{post.name}</Link>
                    </Typography>
                </CardTitle>

                <p className="line-clamp-4 font-title font-light" dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>

                <CardFooter className="mt-auto flex items-center p-0">
                    <Button asChild variant="link" className="p-0 font-title text-base underline">
                        <Link href={route('posts.show', post.slug)}> {t('cards.posts.action')}</Link>
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
};

export default PostCard;
