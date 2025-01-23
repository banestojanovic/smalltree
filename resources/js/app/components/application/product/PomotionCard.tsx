import { Card, CardContent } from '@/app/components/ui/card';
import React from 'react';
import { Typography } from '../../ui/typography';

interface PromotionCardProps {
    title: string;
    description: string;
    bgImageSrc: string;
    children?: React.ReactNode;
    cardClass?: string;
    variant?: string;
}

const PromotionCard = ({ title, description, bgImageSrc, children, cardClass, variant }: PromotionCardProps) => {
    return (
        <Card className={`relative h-full rounded-none border-none bg-cover bg-center shadow-none ${cardClass ?? ''}`} style={{ backgroundImage: `url(${bgImageSrc})` }}>
            <div className="absolute inset-0 z-0 bg-black/35"></div>

            <CardContent className={`relative z-10 flex h-full w-full flex-col justify-between p-4 ${variant === 'package' ? 'items-center justify-center' : 'lg:p-8'}`}>
                <div className={`space-y-2 ${variant === 'package' ? 'w-full lg:px-12 xl:px-24' : ''}`}>
                    <Typography as="h2" className="text-white">
                        {title}
                    </Typography>

                    <Typography as="p" className="font-light text-white">
                        {description}
                    </Typography>

                    {variant === 'package' && <>{children}</>}
                </div>

                {variant !== 'package' && <div className="mt-7">{children}</div>}
            </CardContent>
        </Card>
    );
};

export default PromotionCard;
