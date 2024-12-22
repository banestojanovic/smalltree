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

export default function PhotoSlider({ product }: PageProps<{ product: App.Data.ProductData }>) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <div className="">
                {/*Main Slider*/}
                <div className="h-full">
                    <Swiper spaceBetween={10} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Thumbs]} className="h-full w-full">
                        {product.photos?.map((photo) => (
                            <SwiperSlide key={photo.id}>
                                <img className="h-96 w-full rounded-lg object-contain" src={photo.original_url} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/*Thumbnails */}
                <div className="mt-5 flex items-center justify-between gap-x-5">
                    <Button className="thumb-slider-prev" variant="outline">
                        <ArrowLeft />
                    </Button>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView="auto"
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                        navigation={{
                            nextEl: '.thumb-slider-next',
                            prevEl: '.thumb-slider-prev',
                        }}
                    >
                        {product.photos?.map((photo) => (
                            <SwiperSlide key={photo.id}>
                                <img className="h-20 cursor-pointer rounded-lg" src={photo.original_url} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Button className="thumb-slider-next" variant="outline">
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </>
    );
}
