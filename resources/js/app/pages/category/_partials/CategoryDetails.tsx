import { usePage } from '@inertiajs/react';

import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';

const CategoryDetails = () => {
    const { category }: PageProps<{ category?: App.Data.CategoryData }> =
        usePage().props;

    return (
        <section className="mt-10 sm:mt-20">
            <div className="container">
                <Typography as="h2">{category.name}</Typography>
                <Typography as="p" className="mt-7">
                    {category.description}
                </Typography>
            </div>
        </section>
    );
};

export default CategoryDetails;
