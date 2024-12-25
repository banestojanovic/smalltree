import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import TeaRituals from '@/app/components/application/TeaRituals';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PageProps } from '@/app/types';
import Hero from './_partials/Hero';
import PopularProducts from './_partials/PopularProducts';
import Promotions from './_partials/Promotions';
import RecommendedProducts from './_partials/RecommendedProducts';
import TopPosts from './_partials/TopPosts';

const Home = ({
    popularProducts,
    staffRecommendedProducts,
    posts,
    specialOffer,
    productOfTheMonth,
}: PageProps<{
    popularProducts?: App.Data.ProductData[];
    staffRecommendedProducts?: App.Data.ProductData[];
    posts?: App.Data.PostData[];
    specialOffer?: App.Data.ProductData;
    productOfTheMonth?: App.Data.ProductData;
}>) => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('enums.page.titles.home')} />
            <Hero />
            <CategoriesSlider />
            <Promotions specialOffer={specialOffer} productOfTheMonth={productOfTheMonth} />
            <PopularProducts products={popularProducts} />
            <RecommendedProducts products={staffRecommendedProducts} />
            <TeaRituals />
            <TopPosts posts={posts} />
        </>
    );
};

Home.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default Home;
