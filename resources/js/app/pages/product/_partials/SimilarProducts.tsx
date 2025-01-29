import ProductCard from '@/app/components/application/product/ProductCard';
import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { usePage } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, FreeMode, Navigation, Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const RelatedProducts = () => {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);

    const { similarProducts } = usePage<{
        similarProducts: App.Data.ProductData[];
    }>().props;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1025);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!similarProducts?.length) return null;

    const ProductGrid = () => (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {similarProducts.map((product: App.Data.ProductData, index) => (
                <motion.div key={product.id} initial={{ y: `${index + 50}px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: (index + 1) / 4 }} viewport={{ once: true }}>
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </div>
    );

    const ProductSwiper = () => (
        <div className="relative">
            <Button variant={`ghost`} className="category-slider-button-prev absolute top-1/2 left-2 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow">
                <ChevronLeftIcon className="size-4" />
            </Button>

            <Swiper
                modules={[Navigation, Scrollbar, FreeMode, Thumbs, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    960: {
                        slidesPerView: 3,
                    },
                }}
                freeMode={true}
                navigation={{
                    prevEl: '.category-slider-button-prev',
                    nextEl: '.category-slider-button-next',
                }}
            >
                {similarProducts.map((product: App.Data.ProductData) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Button variant={`ghost`} className="category-slider-button-next absolute top-1/2 right-2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white p-2 shadow">
                <ChevronRightIcon className="size-4" />
            </Button>
        </div>
    );

    return (
        <section className="mt-6 sm:mt-10">
            <div className="container">
                <motion.div initial={{ y: `-20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }} viewport={{ once: true }}>
                    <Typography as="h2">{t('product.similar_products.title')}</Typography>
                </motion.div>
                <motion.div initial={{ y: `20px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }} viewport={{ once: true }}>
                    <Typography as="p" className="mt-3">
                        {t('product.similar_products.description')}
                    </Typography>
                </motion.div>
                <div className="mt-10">{isMobile ? <ProductSwiper /> : <ProductGrid />}</div>
            </div>
        </section>
    );
};

export default RelatedProducts;
