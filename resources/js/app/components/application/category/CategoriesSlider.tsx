import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/ui/avatar';
import { Link, usePage } from '@inertiajs/react';

import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { ChevronRight } from 'lucide-react';

// Import Swiper styles
import { Button } from '@/app/components/ui/button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const CategoriesSlider = () => {
    const { categories } = usePage<{
        global: {
            categories: App.Data.CategoryData[];
        };
    }>().props.global;

    return (
        <section className="mt-10">
            <div className="container">
                <div className="relative">
                    <Button
                        variant={'outline'}
                        className="swiper-button-prev absolute left-0 z-10"
                    >
                        <ChevronRight className="rotate-180" />
                    </Button>
                    <Button
                        variant={'outline'}
                        className="swiper-button-next absolute right-0 z-10"
                    >
                        <ChevronRight />
                    </Button>

                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={10}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                    >
                        {categories?.map((category) => (
                            <SwiperSlide key={category.id}>
                                <div className="flex flex-col items-center">
                                    <Avatar>
                                        <AvatarImage
                                            src={category.cover.original_url}
                                        />
                                        <AvatarFallback className="text-lg">
                                            {category.name
                                                ?.slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Link
                                        href={route(
                                            'categories.show',
                                            category.slug,
                                        )}
                                        className="mt-4 text-xs font-semibold"
                                    >
                                        {category.name}
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSlider;
