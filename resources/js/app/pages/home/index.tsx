import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import TeaRituals from '@/app/components/application/TeaRituals';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PageProps } from '@/app/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
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
    hero,
}: PageProps<{
    popularProducts?: App.Data.ProductData[];
    staffRecommendedProducts?: App.Data.ProductData[];
    posts?: App.Data.PostData[];
    specialOffer: { title: string; subtitle: string; image: string; product: App.Data.ProductData };
    productOfTheMonth: { title: string; subtitle: string; image: string; product: App.Data.ProductData };
    hero: { title: string; subtitle: string; image: string };
}>) => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('enums.page.titles.home')} />
            <Hero hero={hero} />
            <CategoriesSlider />
            <PopularProducts products={popularProducts} />
            <Promotions specialOffer={specialOffer} productOfTheMonth={productOfTheMonth} />
            <RecommendedProducts products={staffRecommendedProducts} />
            <TeaRituals matchRitual={staffRecommendedProducts} mateRitual={staffRecommendedProducts} />
            <TopPosts posts={posts} />
        </>
    );
};

Home.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default Home;
