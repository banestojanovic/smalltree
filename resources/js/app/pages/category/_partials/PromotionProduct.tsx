import { useTranslation } from 'react-i18next';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import PromotionCard from '@/app/components/application/product/PomotionCard';
import { ProductQuickViewModal } from '@/app/components/application/product/ProductQuickViewModal';
import PromotionCardItem from '@/app/components/application/product/PromotionCardItem';

const PromotionProduct = ({ promotionProduct }: { promotionProduct: App.Data.ProductData }) => {
    const { t } = useTranslation();

    return (
        <PromotionCard title={t('enums.homepage.promotions.special_offer')} description={t('enums.homepage.promotions.special_offer_description')} bgImageSrc={promotionProduct.cover.original_url}>
            <div className="mt-7 items-center justify-between md:mt-auto md:flex">
                <PromotionCardItem product={promotionProduct} />

                <div className="inline-flex items-center justify-end">
                    {promotionProduct.variations && promotionProduct.variations.length > 0 ? (
                        <ProductQuickViewModal product={promotionProduct} />
                    ) : (
                        <AddToCartButton variant="secondary" product={promotionProduct} productVariantId={null} />
                    )}
                </div>
            </div>
        </PromotionCard>
    );
};

export default PromotionProduct;
