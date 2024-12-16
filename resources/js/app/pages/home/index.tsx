import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import Hero from './_partials/Hero';
import PopularProducts from './_partials/PopularProducts';
import Promotions from './_partials/Promotions';
import RecommendedProducts from './_partials/RecommendedProducts';
import TopPosts from './_partials/TopPosts';
import TeaRituals from '@/app/components/application/TeaRituals';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('enums.page.titles.home')} />
            <Hero />
            <CategoriesSlider />
            <Promotions />
            <PopularProducts />
            <RecommendedProducts />
            <TeaRituals />
            <TopPosts />
            <p className="py-20"></p>;
        </>
    );
};

Home.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default Home;
