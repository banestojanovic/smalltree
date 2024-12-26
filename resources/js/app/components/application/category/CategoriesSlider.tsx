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
                <div className="flex items-center justify-between gap-x-1">
                    <Button variant="ghost" className="category-slider-button-prev">
                        <ChevronRight className="rotate-180" />
                    </Button>

                    <Swiper
                        modules={[Navigation, Scrollbar, FreeMode, Thumbs]}
                        spaceBetween={4}
                        slidesPerView={3}
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
                                    <Avatar>
                                        <AvatarImage src={category.cover.original_url} className="object-cover" />
                                        <AvatarFallback className="text-lg">{category.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="mt-4 text-center text-xs font-semibold">{category.name}</span>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Button variant="ghost" className="category-slider-button-next">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSlider;
