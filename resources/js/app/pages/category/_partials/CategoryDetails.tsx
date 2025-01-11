import { usePage } from '@inertiajs/react';

import { Typography } from '@/app/components/ui/typography';
import { PageProps } from '@/app/types';

const CategoryDetails = () => {
    const { category }: PageProps<{ category?: App.Data.CategoryData }> =
        usePage().props;

    return (
        category && (
            <section className="mt-5 sm:mt-10">
                <div className="container">
                    <Typography as="h2">{category.name}</Typography>
                    <Typography as="p" className="mt-3">
                        {category.description}
                    </Typography>
                </div>
            </section>
        )
    );
};

export default CategoryDetails;
