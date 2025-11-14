import CategoriesSlider from '@/app/components/application/category/CategoriesSlider';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { PaginatedData } from '@/app/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsList from './_partials/ProductsList';
import ProductsListFilters from './_partials/ProductsListFilters';

interface queryProps {
    attributes: never;
    variations: never;
    priceRange: number[] | never;
    search: string | number | never;
    selectedCategories: string[] | [];
    selectedTypes: string[] | [];
    contains: Record<string, string[] | null>;
}

interface PageDataProps {
    title?: string;
    description?: string;
    slug?: string;
    isCategory?: boolean;
    isNew?: boolean;
    category?: App.Data.CategoryData;
}

interface ImageProps {
    original_url: string;
}

const ProductsSearchPage = ({
    pageData,
    products,
    attributes,
    radioAttributes,
    variations,
    types,
    query,
}: {
    pageData: PageDataProps;
    products: PaginatedData<App.Data.ProductData>;
    attributes: App.Data.AttributeData[];
    radioAttributes: App.Data.AttributeData[];
    variations: App.Data.VariationData[];
    types: App.Data.ProductTypeData[];
    query: queryProps;
}) => {
    const { t } = useTranslation();

    return (
        <>
            {pageData?.isCategory ? (
                <Head>
                    <title>{pageData?.title ?? t('products.products_search')}</title>
                    <meta name="description" content={pageData?.description ?? ''} />
                    <meta name="keywords" content={window.location.href} />
                    <meta name="robots" content="index, follow" />

                    <link rel="canonical" href={window.location.href} />

                    <meta property="og:title" content={pageData?.title ?? t('products.products_search')} />
                    <meta property="og:description" content={pageData?.description ?? ''} />
                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:type" content="category" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={pageData?.title ?? t('products.products_search')} />
                    <meta name="twitter:description" content={pageData.description ?? ''} />
                </Head>
            ) : (
                <Head title={t('products.products_search')} />
            )}

            <CategoriesSlider />

            {pageData?.title || pageData?.description ? (
                <section className="mt-5 sm:mt-10">
                    <div className="container mx-auto">
                        {pageData?.title && (
                            <motion.div initial={{ y: `-20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
                                <Typography as="h2">{pageData.title}</Typography>
                            </motion.div>
                        )}
                        {pageData?.description && (
                            <motion.div initial={{ y: `20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
                                <Typography as="p" className="mt-3">
                                    {pageData.description}
                                </Typography>
                            </motion.div>
                        )}
                    </div>

                    {pageData?.category && pageData.category?.images?.length > 1 && (
                        <div className="container mx-auto mt-5">
                            <div className={`grid grid-cols-4 gap-2 sm:gap-4`}>
                                {pageData.category.images.slice(1).map((image: ImageProps, index: number) => (
                                    <figure key={index} className={`rounded bg-white p-1.5`}>
                                        <img src={image?.original_url ?? null} alt="Primer korporativnog poklona" className={`aspect-square rounded object-cover`} />
                                    </figure>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            ) : (
                ''
            )}

            <ProductsListFilters pageData={pageData} attributes={attributes} radioAttributes={radioAttributes} variations={variations} types={types} query={query} />

            <ProductsList products={products} additional={pageData} />
        </>
    );
};

ProductsSearchPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default ProductsSearchPage;
