import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

import PostCard from '@/app/components/application/blog/PostCard';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/card';
import Pagination from '@/app/components/ui/pagination';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PaginatedData } from '@/app/types';
import { useTranslation } from 'react-i18next';

const PostIndexPage = ({ posts, featurePost }: { posts: PaginatedData<App.Data.PostData>; featurePost: App.Data.PostData }) => {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('posts.stories')} />
            <div className="container mt-7 sm:mt-10">
                <Card className="relative h-60 bg-cover bg-center sm:h-80" style={{ backgroundImage: `url(${featurePost.cover.original_url})` }}>
                    <CardHeader className="relative flex h-full w-full flex-col justify-center">
                        <CardTitle>
                            <Typography as="h4" className="!font-normal text-white">
                                {t('posts.featured_post')}
                            </Typography>

                            <Typography as="h2" className="text-white">
                                <Link href={route('posts.show', featurePost.slug)}>{featurePost.name}</Link>
                            </Typography>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <section>
                    <Typography as="h2" className="!my-7">
                        {t('posts.stories')}
                    </Typography>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {posts.data && posts.data.length > 0 ? (
                            posts.data.map((post) => <PostCard post={post} key={post.id} />)
                        ) : (
                            <Typography as="p" className="">
                                {t('posts.no_story_available')}
                            </Typography>
                        )}
                    </div>

                    <div className="mt-10 flex items-center justify-center">
                        <Pagination links={posts.links} />
                    </div>
                </section>
            </div>
        </>
    );
};
PostIndexPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default PostIndexPage;
