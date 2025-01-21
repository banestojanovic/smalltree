import PostCard from '@/app/components/application/blog/PostCard';
import Pagination from '@/app/components/ui/pagination';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PaginatedData } from '@/app/types';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface QueryProps {
    category?: string;
}

const PostIndexPage = ({
    posts,
    categories,
    category,
}: {
    posts: PaginatedData<App.Data.PostData>;
    categories: App.Data.PostCategoryData[];
    category: App.Data.PostCategoryData;
    query: QueryProps;
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('posts.stories')} />
            <div className="container mt-7 space-y-10 sm:mt-10">
                <section className="mt-5 sm:mt-10">
                    <motion.div initial={{ y: `-20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
                        <Typography as="h2">{category?.name ? category.name : t('blog.title')}</Typography>
                    </motion.div>
                    <motion.div initial={{ y: `20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
                        <Typography as="p" className="mt-3">
                            {category?.description ? category.description : t('blog.subtitle')}
                        </Typography>
                    </motion.div>
                </section>

                {categories && (
                    <ToggleGroup
                        type="single"
                        className="flex-wrap justify-start gap-3"
                        value={category?.slug ?? undefined}
                        onValueChange={(value) => {
                            router.visit(route('posts_by_category.index', { category: value }), {
                                only: ['posts', 'category'],
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                    >
                        {categories.map((category, index: number) => (
                            <motion.div key={category.id} initial={{ x: 50 }} whileInView={{ x: 0 }} transition={{ type: 'spring', duration: (index + 1) / 4 }}>
                                <ToggleGroupItem variant="outline" value={category.slug} aria-label="Toggle bold" key={category.id} className={`transition active:scale-95`}>
                                    {category.name}
                                </ToggleGroupItem>
                            </motion.div>
                        ))}
                    </ToggleGroup>
                )}

                <section>
                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.data && posts.data.length > 0 ? (
                            posts.data.map((post, index: number) => (
                                <motion.div key={post.id} initial={{ y: `${index + 50}px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: (index + 1) / 4 }}>
                                    <PostCard post={post} />
                                </motion.div>
                            ))
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
