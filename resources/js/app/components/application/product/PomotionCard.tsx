import { Card, CardContent } from '@/app/components/ui/card';
import React from 'react';
import { Typography } from '../../ui/typography';

interface PromotionCardProps {
    title: string;
    description: string;
    bgImageSrc: string;
    children?: React.ReactNode;
    cardClass?: string;
}

const PromotionCard = ({ title, description, bgImageSrc, children, cardClass }: PromotionCardProps) => {
    return (
        <Card className={`relative h-full bg-cover bg-center md:min-h-[436px] ${cardClass ?? ''}`} style={{ backgroundImage: `url(${bgImageSrc})` }}>
            <div className="absolute inset-0 z-0 rounded-lg bg-black bg-opacity-25"></div>

            <CardContent className="relative z-10 flex h-full w-full flex-col justify-between !px-4 !py-4 lg:!px-8 lg:!py-8">
                <div className={`space-y-2`}>
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
