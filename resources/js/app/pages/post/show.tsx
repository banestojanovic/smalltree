import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

import PostCard from '@/app/components/application/blog/PostCard';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { useTranslation } from 'react-i18next';

const PostShowPage = ({ post, recommendedPosts }: { post: App.Data.PostData; recommendedPosts: App.Data.PostData[] }) => {
    const { t } = useTranslation();
    return (
        <>
            <Head title={post.name} />
            <div className="container mt-7 sm:mt-10">
                <img src={post.cover.original_url} alt={post.name} className="h-[200px] w-full rounded-lg object-cover md:h-[500px]" />

                <div className="mt-7">
                    <Typography as="h1" className="">
                        {post.name}
                    </Typography>

                    <Typography as="p" className="mt-2 text-lg tracking-widest">
                        {post.date_created}
                    </Typography>

                    <Typography as="p" className="prose lg:prose-xl mt-7">
                        {post.content}
                    </Typography>

                    <section className="mt-10 md:mt-32">
                        <Typography as="h2" className="">
                            {t('posts.recommended_stories')}
                        </Typography>
                        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {recommendedPosts && recommendedPosts.length > 0 ? (
                                recommendedPosts.map((post) => <PostCard post={post} key={post.id} />)
                            ) : (
                                <Typography as="p" className="">
                                    {t('posts.no_story_available')}
                                </Typography>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
PostShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default PostShowPage;
