import { Button } from '@/app/components/ui/button';
import { useTranslation } from 'react-i18next';

import PostCard from '@/app/components/application/blog/PostCard';
import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';

const PopularProducts = ({ posts }: PageProps<{ posts?: App.Data.PostData[] }>) => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0">{t('enums.homepage.sections.stores_with_tea')}</h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => <PostCard post={post} key={post.id} />)
                    ) : (
                        <Typography as="p" className="">
                            {t('posts.no_story_available')}
                        </Typography>
                    )}
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <Button asChild>
                        <Link href={route('posts.index')}>{t('enums.homepage.sections.see_all')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;
