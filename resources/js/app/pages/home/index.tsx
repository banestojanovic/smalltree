import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import ProductsSection from '@/app/pages/home/_partials/ProductsSection';
import { PageProps } from '@/app/types';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './_partials/Hero';
import Promotions from './_partials/Promotions';

const Home = ({
    popularProducts,
    staffRecommendedProducts,
    teaSets,
    newProducts,
    specialOffer,
    productOfTheMonth,
    hero,
}: PageProps<{
    popularProducts?: App.Data.ProductData[];
    staffRecommendedProducts?: App.Data.ProductData[];
    teaSets?: App.Data.ProductData[];
    newProducts: { title: string; subtitle: string; image: string; products: App.Data.ProductData[] };
    specialOffer: { title: string; subtitle: string; image: string; products: App.Data.ProductData[] };
    productOfTheMonth: { title: string; subtitle: string; image: string; products: App.Data.ProductData[] };
    hero: { title: string; subtitle: string; image: string };
}>) => {
    const { t } = useTranslation();

    return (
        <>
            <span className={`bg-lime-700 bg-rose-800`}></span>
            <Head title={t('enums.page.titles.home')} />
            <Hero hero={hero} />
            <CategoriesSlider />
            <ProductsSection
                products={popularProducts}
                title={t('homepage.sections.most_popular.title')}
                subtitle={t('homepage.sections.most_popular.subtitle')}
                action={{
                    title: t('homepage.sections.most_popular.action'),
                    link: route('search.type', { type: 'cajevi' }),
                }}
            />
            <Promotions newProducts={newProducts} specialOffer={specialOffer} productOfTheMonth={productOfTheMonth} />
            <ProductsSection
                products={staffRecommendedProducts}
                title={t('homepage.sections.recommended.title')}
                subtitle={t('homepage.sections.recommended.subtitle')}
                action={{
                    title: t('homepage.sections.recommended.action'),
                    link: route('search.type', { type: 'cajevi' }),
                }}
            />
            <ProductsSection
                products={teaSets}
                title={t('homepage.sections.sets.title')}
                subtitle={t('homepage.sections.sets.subtitle')}
                action={{
                    title: t('homepage.sections.sets.action'),
                    link: route('search.type', { type: 'dodaci' }),
                }}
            />
        </>
    );
};

Home.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;
export default Home;
