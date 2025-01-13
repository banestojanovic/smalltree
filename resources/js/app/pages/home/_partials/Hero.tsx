import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative h-full bg-cover bg-center" style={{ backgroundImage: `url(/images/image-placeholder.jpg)` }}>
            {/* Overlay */}
            <div className="absolute inset-0 z-0 bg-black opacity-40"></div>

            <div className="relative z-10 h-full md:h-80 xl:h-96">
                <div className="container flex h-full items-center text-white">
                    <div className="">
                        <Typography as="p" className="!font-normal">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        </Typography>
                        <Typography as="h1" className="!font-normal">Special Promotion or event or anything important</Typography>
                        <div className="mb-7 mt-7 md:mb-0">
                            <Button>{t('enums.homepage.hero.buy_now')}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
