import PrimaryButton from '@/app/components/PrimaryButton';
import { PageProps } from '@/app/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import DefaultLayout from '../../layouts/DefaultLayout';

const ProductIndex = ({
    products,
}: PageProps<{ products: App.Data.CategoryData }>) => {
    const { global } = usePage().props;
    // console.log(global);

    const { data, setData, get, processing, errors, reset } = useForm({
        selectedCategory: '',
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
                {/* Category Select and Search Button */}
                <div className="mb-6 flex items-center space-x-4">
                    <select
                        className="rounded-lg border bg-white p-2 text-black dark:bg-gray-800 dark:text-white"
                        value={data.selectedCategory}
                        onChange={(e) =>
                            setData('selectedCategory', e.target.value)
                        }
                    >
                        <option value="">Select a Category</option>
                        {global.categories.map((category) => (
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

                {products && products.length > 0 ? (
                    products.map((category) => (
                        <div key={category.id} className="mb-8">
                            {/* Category Title */}
                            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                                {category.name}
                            </h2>

                            {/* Products Cards */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {category.products.map((product) => (
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
                                            {product.description ||
                                                'No description available.'}
                                        </p>
                                        <div className="mt-5 flex items-center justify-between">
                                            <div className="text-primary-500 mt-2 font-semibold">
                                                ${product.price}
                                            </div>

                                            <span className="text-black dark:text-white">
                                                {category.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No products available.
                    </p>
                )}
            </div>
        </>
    );
};

// eslint-disable-next-line react/no-children-prop
ProductIndex.layout = (page) => (
    <DefaultLayout children={page} title="Products" />
);

export default ProductIndex;
