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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

interface PhotoSliderProps {
    id: string | number;
    original_url?: string;
}

export default function PhotoSlider({ product }: PageProps<{ product: App.Data.ProductData }>) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

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
                                        <img className="h-96 w-full rounded-lg object-cover" src={photo?.original_url} alt={'Product slider image'} />
                                    </SwiperSlide>
                                ),
                        )}
                    </Swiper>
                </div>

                {/*Thumbnails */}
                <div className="mt-5 flex items-center justify-between gap-x-5">
                    <Button className="slider-prev" variant="outline">
                        <ArrowLeft />
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
                    <Button className="slider-next" variant="outline">
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </>
    );
}
