import { Head } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

import PostCard from '@/app/components/application/blog/PostCard';
import Pagination from '@/app/components/ui/pagination';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PaginatedData } from '@/app/types';
import { meta } from 'eslint-plugin-react/lib/rules/jsx-props-no-spread-multi';
import { useTranslation } from 'react-i18next';
import category = meta.docs.category;

const PostIndexPage = ({ posts, featurePost, categories }: { posts: PaginatedData<App.Data.PostData>; featurePost: App.Data.PostData; categories: App.Data.PostCategoryData[] }) => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <>
            <Head title={t('posts.stories')} />
            <div className="container mt-7 sm:mt-10">
                {/*<Card className="relative h-60 bg-cover bg-center sm:h-80" style={{ backgroundImage: `url(${featurePost.cover.original_url})` }}>*/}
                {/*    <CardHeader className="relative flex h-full w-full flex-col justify-center">*/}
                {/*        <CardTitle>*/}
                {/*            <Typography as="h4" className="!font-normal text-white">*/}
                {/*                {t('posts.featured_post')}*/}
                {/*            </Typography>*/}

                {/*            <Typography as="h2" className="text-white">*/}
                {/*                <Link href={route('posts.show', featurePost.slug)}>{featurePost.name}</Link>*/}
                {/*            </Typography>*/}
                {/*        </CardTitle>*/}
                {/*    </CardHeader>*/}
                {/*</Card>*/}

                {categories && (
                    <ToggleGroup type="single" className="flex-wrap justify-start gap-3" value={selectedCategory ?? undefined} onValueChange={(value) => setSelectedCategory(value)}>
                        {categories.map((category) => (
                            <ToggleGroupItem variant="outline" value={category.id.toString()} aria-label="Toggle bold" key={category.id}>
                                {category.name}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                )}
                <section>
                    <Typography as="h2" className="!mt-7">
                        {t('posts.stories')}
                    </Typography>

                    <Typography as="p" className="">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </Typography>

                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
