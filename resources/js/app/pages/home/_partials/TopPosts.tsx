import PostCard from '@/app/components/application/blog/PostCard';
import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TopPosts = ({ posts }: PageProps<{ posts?: App.Data.PostData[] }>) => {
    const { t } = useTranslation();

    return posts && posts?.length > 0 ? (
        <section className="mt-10 pb-10 sm:mt-20">
            <div className="container">
                <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0"></h2>
                <Typography as="h2" className={`sm:text-3xl`}>
                    {t('homepage.sections.posts.title')}
                </Typography>
                <Typography as="p" className={`mt-2 leading-normal text-foreground/80 sm:mt-4`}>
                    {t('homepage.sections.posts.subtitle')}
                </Typography>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {posts?.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ y: `${index + 50}px` }}
                            whileInView={{ y: 0 }}
                            transition={{ type: 'spring', duration: (index + 1) / 4 }}
                            className={`flex ${index === 0 ? 'max-lg:col-span-full' : ''}`}
                        >
                            <PostCard post={post} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <Button asChild className="h-12 px-10">
                        <Link href={route('posts.index')}>{t('homepage.sections.posts.action')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    ) : (
        <></>
    );
};

export default TopPosts;
