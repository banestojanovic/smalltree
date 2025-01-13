import { useState } from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { useTranslation } from 'react-i18next';

interface PhotoSliderProps {
    id: string | number;
    original_url?: string;
}

export default function PhotoSlider({ product }: PageProps<{ product: App.Data.ProductData }>) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const { t } = useTranslation();

    return (
        <>
            <div className="">
                {/*Main Slider*/}
                <div className="h-full">
                    <Swiper
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Thumbs, Navigation]}
                        navigation={{
                            nextEl: '.slider-next',
                            prevEl: '.slider-prev',
                        }}
                        className="h-full w-full"
                    >
                        {product.photos?.map(
                            (photo: PhotoSliderProps) =>
                                photo?.original_url && (
                                    <SwiperSlide key={photo?.id}>
                                        <div className="relative">
                                            {product.discount && (
                                                <span className="absolute right-2 top-2 rounded-md bg-primary px-2 py-1.5 text-sm text-white">
                                                    {t('order.discount')} {product.discount.percentage}%
                                                </span>
                                            )}
                                            <img className="h-96 w-full rounded-lg object-cover" src={photo?.original_url} alt={'Product slider image'} />
                                        </div>
                                    </SwiperSlide>
                                ),
                        )}
                    </Swiper>
                </div>

                {/*Thumbnails */}
                <div className="mt-5 flex items-center justify-between gap-x-5">
                    <Button className="slider-prev flex size-5 items-center justify-center rounded-full bg-white p-3 md:size-7" variant="ghost">
                        <ChevronRight className="!h-auto !w-2 rotate-180 sm:!w-4" />
                    </Button>

                    <Swiper
                        onSwiper={(swiper) => setThumbsSwiper(swiper)}
                        spaceBetween={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        slidesPerView={2}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 4,
                            },
                            768: {
                                slidesPerView: 'auto',
                                spaceBetween: 4,
                            },
                            1024: {
                                slidesPerView: 'auto',
                                spaceBetween: 4,
                            },
                        }}
                        className="mySwiper"
                    >
                        {product.photos?.map(
                            (photo: PhotoSliderProps) =>
                                photo?.original_url && (
                                    <SwiperSlide key={photo.id}>
                                        <img className="aspect-square h-20 w-[calc(100%-10px)] cursor-pointer rounded-lg object-cover" src={photo?.original_url} alt={'Product slider image'} />
                                    </SwiperSlide>
                                ),
                        )}
                    </Swiper>

                    <Button className="slider-next flex size-5 items-center justify-center rounded-full bg-white p-3 md:size-7" variant="ghost">
                        <ChevronRight className="!h-auto !w-2 sm:!w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}
