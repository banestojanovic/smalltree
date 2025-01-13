import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Link, usePage } from '@inertiajs/react';

import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { FreeMode, Navigation, Scrollbar, Thumbs } from 'swiper/modules';

import { ChevronRight } from 'lucide-react';

// Import Swiper styles
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const CategoriesSlider = () => {
    const categories = usePage<PageProps<{ global?: App.Data.GlobalData }>>().props.global?.categories;

    return (
        <section className="mt-10">
            <div className="container">
                <div className="flex items-center justify-between gap-x-3">
                    <Button className="category-slider-button-prev flex size-5 items-center justify-center rounded-full bg-white p-3 md:size-7" variant="ghost">
                        <ChevronRight className="!h-auto !w-2 rotate-180 sm:!w-4" />
                    </Button>

                    <Swiper
                        modules={[Navigation, Scrollbar, FreeMode, Thumbs]}
                        spaceBetween={4}
                        slidesPerView={4}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 5,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                            1440: {
                                slidesPerView: 8,
                                spaceBetween: 50,
                            },
                        }}
                        freeMode={true}
                        navigation={{
                            prevEl: '.category-slider-button-prev',
                            nextEl: '.category-slider-button-next',
                        }}
                    >
                        {categories?.map((category) => (
                            <SwiperSlide key={category.id}>
                                <Link href={route('categories.show', category.slug)} className="flex flex-col items-center">
                                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-white md:size-28">
                                        <Avatar className="size-10 border border-gray-300 md:size-24">
                                            <AvatarImage src={category.cover.original_url} className="object-cover" />
                                            <AvatarFallback className="text-lg">{category.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </span>
                                    <span className="mt-2 text-center text-sm">{category.name}</span>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Button className="category-slider-button-next flex size-5 items-center justify-center rounded-full bg-white p-3 md:size-7" variant="ghost">
                        <ChevronRight className="!h-auto !w-2 sm:!w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSlider;
