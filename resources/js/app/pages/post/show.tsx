import PostCard from '@/app/components/application/blog/PostCard';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const PostShowPage = ({ post, recommendedPosts }: { post: App.Data.PostData; recommendedPosts: App.Data.PostData[] }) => {
    const { t } = useTranslation();
    return (
        <>
            <Head title={post.name} />
            <div>
                <div className="container mt-7 max-w-4xl space-y-6 sm:mt-16 lg:space-y-10">
                    {post.cover?.original_url && (
                        <motion.figure initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }} className="rounded-lg bg-white p-1.5">
                            <img src={post.cover.original_url} alt={post.name} className="aspect-video w-full rounded-lg object-cover" />
                        </motion.figure>
                    )}

                    <section className={`space-y-6 lg:space-y-10`}>
                        <div className={`space-y-2`}>
                            {post?.category && (
                                <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                                    {
                                        <Link href={route('posts_by_category.index', { category: post.category.slug })} className={`text-foreground/60 hover:underline`}>
                                            {post.category.name}
                                        </Link>
                                    }
                                </motion.div>
                            )}

                            <Typography as="h1" className={`text-[30px] max-md:leading-snug lg:text-[44px] lg:leading-snug`}>
                                <motion.span initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                                    {post.name}
                                </motion.span>
                            </Typography>
                        </div>

                        <motion.article
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            viewport={{ once: true }}
                            className="prose text-foreground lg:prose-lg prose-headings:font-medium"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="flex flex-col gap-5 border-t border-b border-gray-300 py-5 sm:flex-row sm:items-center sm:py-10">
                            <Typography as="p">
                                <motion.span initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.3 }} viewport={{ once: true }}>
                                    {t('posts.share_with_social_network')}
                                </motion.span>
                            </Typography>

                            <div className="flex items-center gap-x-3">
                                <motion.a
                                    initial={{ x: 50 }}
                                    animate={{ x: 0 }}
                                    transition={{ type: 'spring', duration: 0.3, delay: 0.05 }}
                                    viewport={{ once: true }}
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${route('posts.show', { slug: post.slug })}`}
                                    rel={`noreferrer`}
                                    target="_blank"
                                    className={`hover:opacity-75`}
                                >
                                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_15_1155)">
                                            <path
                                                d="M14.5001 0.579956C6.81218 0.579956 0.580078 6.81206 0.580078 14.5C0.580078 22.1879 6.81218 28.42 14.5001 28.42C22.188 28.42 28.4201 22.1879 28.4201 14.5C28.4201 6.81206 22.188 0.579956 14.5001 0.579956ZM17.7974 10.1993H15.705C15.4571 10.1993 15.1816 10.5255 15.1816 10.9591V12.47H17.7988L17.403 14.6247H15.1816V21.0931H12.7122V14.6247H10.472V12.47H12.7122V11.2027C12.7122 9.38436 13.9737 7.90681 15.705 7.90681H17.7974V10.1993Z"
                                                fill="#886F60"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_15_1155">
                                                <rect width="29" height="29" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </motion.a>

                                <motion.a
                                    initial={{ x: 50 }}
                                    animate={{ x: 0 }}
                                    transition={{ type: 'spring', duration: 0.3, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    href={`https://twitter.com/share?text=${post.name}&url=${route('posts.show', { slug: post.slug })}`}
                                    rel={`noreferrer`}
                                    target="_blank"
                                    className={`flex size-[28px] items-center justify-center rounded-full bg-[#886F60] p-1.5 text-white hover:opacity-75`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`size-5 fill-current`}>
                                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                    </svg>
                                </motion.a>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="container mt-10 md:mt-20">
                    <Typography as="h2" className="">
                        {t('posts.recommended_stories')}
                    </Typography>
                    <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {recommendedPosts && recommendedPosts.length > 0 ? (
                            recommendedPosts.map((post, index: number) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ y: `${index + 50}px` }}
                                    whileInView={{ y: 0 }}
                                    transition={{ type: 'spring', duration: (index + 1) / 6 }}
                                    viewport={{ once: true }}
                                >
                                    <PostCard post={post} />
                                </motion.div>
                            ))
                        ) : (
                            <Typography as="p" className="">
                                {t('posts.no_story_available')}
                            </Typography>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};
PostShowPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default PostShowPage;
