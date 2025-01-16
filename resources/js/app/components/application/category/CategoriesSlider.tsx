import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { PageProps } from '@/app/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const CategoriesSlider = () => {
    const categories = usePage<PageProps<{ global?: App.Data.GlobalData }>>().props.global?.categories;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.offsetWidth < container.scrollWidth);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollState);
            updateScrollState();

            return () => container.removeEventListener('scroll', updateScrollState);
        }
    }, []);

    return (
        <section className="mt-10">
            <div className="container max-lg:px-0">
                <div className="relative flex items-center">
                    <Button
                        onClick={() => scroll('left')}
                        className="absolute top-[40px] z-10 flex size-5 items-center justify-center rounded-full bg-white p-4 lg:relative lg:-top-5"
                        variant={`ghost`}
                        disabled={!canScrollLeft}
                    >
                        <ChevronLeftIcon className="size-4" />
                    </Button>

                    <motion.div
                        ref={scrollContainerRef}
                        className="scrollbar-hidden flex items-start justify-between gap-x-2 overflow-x-auto px-2 lg:gap-x-3"
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        {categories?.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ transform: index <= 3 ? `translateX(${index - 100})` : `translateX(${index + 100})` }}
                                animate={{ transform: 'translateX(0px)' }}
                                transition={{ type: 'spring', duration: (index + 1) / 10 }}
                            >
                                <Link href={route('categories.show', category.slug)} className="flex flex-col items-center">
                                    <span className="group inline-flex size-24 items-center justify-center rounded-full bg-white transition hover:bg-primary/5 lg:size-32">
                                        <Avatar className="size-20 border border-gray-300 transition group-hover:scale-110 lg:size-28">
                                            <AvatarImage src={category.cover?.original_url} className="object-cover" />
                                            <AvatarFallback className="text-lg">{category.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </span>
                                    <span className="mt-2 text-center text-xs sm:text-sm">{category.name}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <Button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-[40px] z-10 flex size-5 items-center justify-center rounded-full bg-white p-4 lg:relative lg:-top-5 lg:right-auto"
                        variant={`ghost`}
                        disabled={!canScrollRight}
                    >
                        <ChevronRightIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSlider;
