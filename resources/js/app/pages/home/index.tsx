import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductsSection from '@/app/pages/home/_partials/ProductsSection';
import PromotionsFull from '@/app/pages/home/_partials/PromotionsFull';
import { PageProps } from '@/app/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './_partials/Hero';
import Promotions from './_partials/Promotions';
import TopPosts from './_partials/TopPosts';

const Home = ({
    popularProducts,
    staffRecommendedProducts,
    teaSets,
    posts,
    specialOffer,
    productOfTheMonth,
    hero,
    promoPackages,
}: PageProps<{
    popularProducts?: App.Data.ProductData[];
    staffRecommendedProducts?: App.Data.ProductData[];
    teaSets?: App.Data.ProductData[];
    posts?: App.Data.PostData[];
    specialOffer: { title: string; subtitle: string; image: string; product: App.Data.ProductData };
    productOfTheMonth: { title: string; subtitle: string; image: string; product: App.Data.ProductData };
    hero: { title: string; subtitle: string; image: string };
    promoPackages?: {
        title: Record<string, string>;
        subtitle: Record<string, string>;
        bg_image: string;
        products: App.Data.ProductData[];
    }[];
}>) => {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('enums.page.titles.home')} />
            <Hero hero={hero} />
            <CategoriesSlider />
            <ProductsSection
                products={popularProducts}
                title={t('homepage.sections.most_popular.title')}
                subtitle={t('homepage.sections.most_popular.subtitle')}
                action={{
                    title: t('homepage.sections.most_popular.action'),
                    link: route('search.teas'),
                }}
            />
            <Promotions specialOffer={specialOffer} productOfTheMonth={productOfTheMonth} />
            <ProductsSection
                products={staffRecommendedProducts}
                title={t('homepage.sections.recommended.title')}
                subtitle={t('homepage.sections.recommended.subtitle')}
                action={{
                    title: t('homepage.sections.recommended.action'),
                    link: route('search.teas'),
                }}
            />
            <ProductsSection
                products={teaSets}
                title={t('homepage.sections.sets.title')}
                subtitle={t('homepage.sections.sets.subtitle')}
                action={{
                    title: t('homepage.sections.sets.action'),
                    link: route('search.sets'),
                }}
            />
            <PromotionsFull promoPackages={promoPackages} />
            <TopPosts posts={posts} />
        </>
    );
};

Home.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;
export default Home;
