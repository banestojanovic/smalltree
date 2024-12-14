import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/app/components/ui/avatar';
import { PageProps } from '@/app/types';
import { usePage } from '@inertiajs/react';

// const Home = ({ products }: PageProps<{ products: App.Data.ProductData }>) => {
const CategoriesSlider = () => {
    const { categories }: PageProps<{ categories?: App.Data.CategoryData[] }> =
        usePage().props;

    return (
        <section className="mt-10">
            <div className="flex items-center justify-center gap-x-7">
                {categories?.map((category) => (
                    <div
                        className="flex flex-col items-center"
                        key={category.id}
                    >
                        <Avatar>
                            <AvatarImage src={category.cover.original_url} />
                            <AvatarFallback className="text-lg">
                                {category.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <p className="mt-4 text-xs font-semibold">
                            {category.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSlider;
