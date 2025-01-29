import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

interface PhotoSliderProps {
    id: string | number;
    original_url?: string;
}

export default function PhotoSlider({ product }: PageProps<{ product: App.Data.ProductData }>) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const { t } = useTranslation();

    return (
        <div>
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
                                            <span className="bg-primary absolute top-4 right-4 rounded-md px-4 py-1.5 text-sm text-white">
                                                {t('order.on_action')} {product?.discount?.percentage ? `${product.discount.percentage}%` : ''}
                                            </span>
                                        )}
                                        <img className="aspect-square w-full rounded-lg object-cover lg:h-[550px]" src={photo?.original_url} alt={'Product slider image'} />
                                    </div>
                                </SwiperSlide>
                            ),
                    )}
                </Swiper>
            </div>

            <div className="mt-5 flex items-center justify-between gap-x-5">
                <Button className="slider-prev flex size-5 items-center rounded-full bg-white p-3 md:size-7" variant="ghost">
                    <ChevronRight className="h-auto! w-2! rotate-180 sm:w-4!" />
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
                    className="thumbSwiper"
                >
                    {product.photos?.map(
                        (photo: PhotoSliderProps, index: number) =>
                            photo?.original_url &&
                            (index !== 0 ? (
                                <SwiperSlide key={photo.id}>
                                    <img className="aspect-square h-40 w-[calc(100%-10px)] cursor-pointer rounded-lg bg-white object-contain" src={photo?.original_url} alt={'Product slider image'} />
                                </SwiperSlide>
                            ) : (
                                ''
                            )),
                    )}
                </Swiper>

                <Button className="slider-next flex size-5 items-center justify-center rounded-full bg-white p-3 md:size-7" variant="ghost">
                    <ChevronRight className="h-auto! w-2! sm:w-4!" />
                </Button>
            </div>
        </div>
    );
}
