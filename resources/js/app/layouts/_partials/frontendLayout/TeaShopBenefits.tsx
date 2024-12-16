import { Typography } from '@/app/components/ui/typography';
import { Signature } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RelatedProducts = () => {
    const { t } = useTranslation();

    return (
        <div className="container flex min-h-40 items-center">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-4">
                <div className="">
                    <Typography as="h2" className="m-auto max-h-10">
                        Tea Shop Benefits
                    </Typography>
                </div>

                <div className="">
                    <div className="flex items-center gap-x-2">
                        <Signature />
                        <Typography as="h4" className="">
                            Benefit 1
                        </Typography>
                    </div>
                    <Typography as="p" className="mt-2 !leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </Typography>
                </div>

                <div className="">
                    <div className="flex items-center gap-x-2">
                        <Signature />
                        <Typography as="h4" className="">
                            Benefit 1
                        </Typography>
                    </div>
                    <Typography as="p" className="mt-2 !leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </Typography>
                </div>

                <div className="">
                    <div className="flex items-center gap-x-2">
                        <Signature />
                        <Typography as="h4" className="">
                            Benefit 1
                        </Typography>
                    </div>
                    <Typography as="p" className="mt-2 !leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
