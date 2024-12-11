import PrimaryButton from '@/app/components/PrimaryButton';
import { PageProps, Paginated } from '@/app/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';

interface queryProps {
    selectedCategory: string[] | [];
}

const ProductIndex = ({
    products,
    query,
}: PageProps<{
    products: Paginated<App.Data.ProductData[]>;
    query: queryProps;
}>) => {
    const { global } = usePage().props;

    const { data, setData, get, processing, errors, reset } = useForm({
        selectedCategory: query?.selectedCategory ?? null,
    });

    const handleSearch = () => {
        get(route('products.index'), {
            onFinish: () => reset('selectedCategory'),
        });
    };

    return (
        <>
            <Head title="Products" />

            <div className="bg-gray-50 p-4 text-black/50 dark:bg-black dark:text-white/50">
                <div className="mb-6 flex items-center space-x-4">
                    <select
                        className="rounded-lg border bg-white p-2 text-black dark:bg-gray-800 dark:text-white"
                        multiple
                        value={data?.selectedCategory}
                        onChange={(e) =>
                            setData(
                                'selectedCategory',
                                e.target.value ? [e.target.value] : [],
                            )
                        }
                    >
                        <option value="">Select a Category</option>
                        {global.categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <PrimaryButton onClick={handleSearch} disabled={processing}>
                        {' '}
                        Search{' '}
                    </PrimaryButton>
                </div>

                {products?.data && products?.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products?.data.map((product: App.Data.ProductData) => (
                            <div
                                key={product.id}
                                className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md dark:bg-gray-800"
                            >
                                <img
                                    className="h-40 w-full object-cover sm:h-60"
                                    src={product.cover.original_url}
                                    alt=""
                                />

                                <h3 className="text-lg font-medium text-black dark:text-white">
                                    {product.name}
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {product.description ??
                                        'No description available.'}
                                </p>
                                <div className="mt-5 flex items-center justify-between">
                                    <div className="text-primary-500 mt-2 font-semibold">
                                        ${product.price}
                                    </div>

                                    <span className="text-black dark:text-white">
                                        {product?.category?.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No products available.
                    </p>
                )}
            </div>
        </>
    );
};

ProductIndex.layout = (page: ReactNode) => (
    <DefaultLayout>{page}</DefaultLayout>
);

export default ProductIndex;
