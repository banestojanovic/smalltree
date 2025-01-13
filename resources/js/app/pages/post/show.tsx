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
                <p className="rounded-lg bg-white p-1">
                    <img src={post.cover.original_url} alt={post.name} className="h-[200px] w-full rounded-lg object-cover md:h-[500px]" />
                </p>

                <div className="mt-10 md:mt-16">

                    {post.categories?.map((category: App.Data.PostCategoryData) => <span key={category.id}>{category.name}</span>)}

                    <Typography as="h1" className="">
                        {post.name}
                    </Typography>

                    {/*<Typography as="p" className="mt-2 text-lg tracking-widest">*/}
                    {/*    {post.date_created}*/}
                    {/*</Typography>*/}

                    <Typography as="p" className="prose mt-7 lg:prose-xl">
                        {post.content}
                    </Typography>

                    <div className="mt-10 flex flex-col gap-5 border-b border-t border-gray-300 py-5 sm:flex-row sm:items-center sm:py-10">
                        <Typography as="p">{t('posts.share_with_social_network')}</Typography>

                        <div className="flex items-center gap-x-3">
                            <span>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_15_1155)">
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
                            </span>

                            <span>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_15_1157)">
                                        <path
                                            d="M14.5001 0.579956C6.81218 0.579956 0.580078 6.81206 0.580078 14.5C0.580078 22.1879 6.81218 28.42 14.5001 28.42C22.188 28.42 28.4201 22.1879 28.4201 14.5C28.4201 6.81206 22.188 0.579956 14.5001 0.579956ZM11.0926 20.2695H8.27378V11.1983H11.0926V20.2695ZM9.66578 10.0847C8.77548 10.0847 8.19983 9.45396 8.19983 8.67386C8.19983 7.87781 8.79288 7.26591 9.70203 7.26591C10.6112 7.26591 11.168 7.87781 11.1854 8.67386C11.1854 9.45396 10.6112 10.0847 9.66578 10.0847ZM21.3876 20.2695H18.5688V15.2424C18.5688 14.0722 18.1599 13.2776 17.1405 13.2776C16.3619 13.2776 15.8993 13.8156 15.6949 14.3332C15.6195 14.5174 15.6006 14.7784 15.6006 15.0379V20.2681H12.7804V14.0911C12.7804 12.9586 12.7441 12.0118 12.7064 11.1969H15.1555L15.2845 12.4569H15.3411C15.7123 11.8653 16.6214 10.9924 18.1425 10.9924C19.997 10.9924 21.3876 12.2351 21.3876 14.906V20.2695Z"
                                            fill="#886F60"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_15_1157">
                                            <rect width="29" height="29" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>

                            <span>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.5001 0.579956C6.81218 0.579956 0.580078 6.81206 0.580078 14.5C0.580078 22.1879 6.81218 28.42 14.5001 28.42C22.188 28.42 28.4201 22.1879 28.4201 14.5C28.4201 6.81206 22.188 0.579956 14.5001 0.579956ZM20.1623 11.9828C20.1672 12.1017 20.1696 12.2196 20.1696 12.3366C20.1696 15.9616 17.4131 20.139 12.37 20.139C10.8799 20.1411 9.42085 19.7131 8.16793 18.9065C8.38156 18.9316 8.59954 18.9437 8.82188 18.9428C10.1066 18.9428 11.2883 18.5063 12.2265 17.7697C11.6548 17.7585 11.1008 17.5692 10.6418 17.2282C10.1828 16.8871 9.84159 16.4114 9.66578 15.8673C10.0764 15.9454 10.4993 15.929 10.9026 15.8195C10.2818 15.6945 9.7235 15.3584 9.3225 14.8683C8.9215 14.3782 8.70258 13.7644 8.70298 13.1312V13.0978C9.07273 13.3023 9.49613 13.427 9.94563 13.4415C9.36389 13.0542 8.95207 12.4593 8.79439 11.7785C8.63672 11.0977 8.7451 10.3823 9.09738 9.77876C9.78631 10.6253 10.6452 11.3178 11.6185 11.8116C12.5919 12.3054 13.658 12.5895 14.748 12.6454C14.6094 12.0572 14.6691 11.4396 14.9177 10.8887C15.1663 10.3379 15.5899 9.88459 16.1227 9.59934C16.6555 9.31409 17.2677 9.21285 17.8639 9.31138C18.4602 9.40991 19.0072 9.70267 19.4199 10.1442C20.0335 10.0227 20.6219 9.79761 21.1599 9.47861C20.9554 10.1139 20.5273 10.6534 19.955 10.9968C20.4985 10.9313 21.0292 10.7851 21.5297 10.5632C21.1629 11.1147 20.6997 11.5956 20.1623 11.9828Z"
                                        fill="#886F60"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

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
