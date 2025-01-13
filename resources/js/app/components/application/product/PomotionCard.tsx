import { Card, CardContent } from '@/app/components/ui/card';
import { Typography } from '../../ui/typography';
import React from 'react';

interface PromotionCardProps {
    title: string;
    description: string;
    bgImageSrc: string;
    children?: React.ReactNode;
}

const PromotionCard = ({ title, description, bgImageSrc, children }: PromotionCardProps) => {
    return (
        <Card className="relative h-full min-h-80 bg-cover bg-center" style={{ backgroundImage: `url(${bgImageSrc})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 z-0 rounded-lg bg-black bg-opacity-50"></div>

            <CardContent className="relative z-10 flex h-full w-full flex-col justify-between !px-4 !py-4 lg:!px-8 lg:!py-8">
                <div>
                    <Typography as="h2" className="text-white">
                        {title}
                    </Typography>

                    <Typography as="p" className="font-light text-white">
                        {description}
                    </Typography>
                </div>

                <div className="mt-7">{children}</div>
            </CardContent>
        </Card>
    );
};

export default PromotionCard;
