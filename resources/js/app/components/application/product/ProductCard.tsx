import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import ProductPrice from '@/app/components/application/product/ProductPrice';
import { ProductQuickViewModal } from '@/app/components/application/product/ProductQuickViewModal';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { PageProps } from '@/app/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../ui/typography';

interface AdditionalProps {
    isNew?: boolean;
}

const ProductCard = ({ product, additional }: { product: PageProps<App.Data.ProductData>; additional?: AdditionalProps }) => {
    const { t } = useTranslation();

    return (
        <Card key={product.id} className="relative flex w-full flex-col justify-between border-none shadow-none transition hover:scale-[1.01] hover:shadow-sm">
            {product.discount && (
                <span className="bg-primary absolute top-2 right-2 rounded-md px-4 py-1.5 text-xs text-white">
                    {t('order.on_action')} {product?.discount?.percentage ? `${product.discount.percentage}%` : ''}
                </span>
            )}
            {(product?.tag || additional?.isNew) && (
                <span className={`absolute top-2 rounded-md ${product?.tagColorClass ?? 'bg-yellow-600'} px-4 py-1.5 text-xs text-white ${product?.discount ? 'left-2' : 'right-2'}`}>{product?.tag?.name || t('labels.new')}</span>
            )}
            {product?.stock_status === 0 && (
                <span
                    className={`bg-ternary absolute rounded-md px-4 py-1.5 text-xs text-white ${product?.discount || product?.tag ? 'left-2' : 'right-2'} ${product?.discount && product?.tag ? 'top-4' : 'top-2'}`}
                >
                    {t('product.out_of_stock')}
                </span>
            )}
            <CardHeader className="flex w-full pb-5">
                <Link href={route('products.show', { slug: product.slug })}>
                    <img className="h-60 w-full rounded-lg object-contain p-2 sm:h-56" src={product?.cover?.original_url ?? '/storage/site/images/placeholder.webp'} alt={product.name} />
                </Link>
                <div className={`space-y-2`}>
                    {product?.category && (
                        <CardDescription className={`text-sm`}>
                            <Link key={product.category.id} href={route('categories.show', { category: product.category.slug })} className={`hover:underline`}>
                                {product.category.name}
                            </Link>
                        </CardDescription>
                    )}
                    <CardTitle>
                        <Typography as="h4" className={`font-normal`}>
                            <Link href={route('products.show', { slug: product.slug })}>{product.name}</Link>
                        </Typography>
                    </CardTitle>
                </div>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between">
                <ProductPrice price={product?.price ?? 0} discountPrice={product?.discount?.price ?? null} />
                {product?.stock_status === 1 && (
                    <motion.div
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`inline-flex items-center justify-end`}
                    >
                        {product.variations && product.variations.length > 0 ? (
                            <ProductQuickViewModal product={product} />
                        ) : (
                            <AddToCartButton variant="secondary" product={product} productVariantId={null} />
                        )}
                    </motion.div>
                )}
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
