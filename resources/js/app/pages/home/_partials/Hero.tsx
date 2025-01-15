import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const Hero = ({ hero }: { hero: { title: string; subtitle: string; image: string } }) => {
    const { t } = useTranslation();

    return (
        <section className="relative h-full bg-cover bg-center" style={{ backgroundImage: `url(${hero.image})` }}>
            <div className="absolute inset-0 z-0 bg-black opacity-20"></div>

            <div className="relative z-10 h-full max-lg:py-12 lg:h-[395px]">
                <div className="container flex h-full items-center text-white">
                    <div className="">
                        {hero?.subtitle && (
                            <motion.div initial={{ y: '10%' }} animate={{ y: '0' }}>
                                <Typography as="p" className="mb-4 font-normal max-lg:text-sm">
                                    {hero.subtitle}
                                </Typography>
                            </motion.div>
                        )}
                        {hero?.title && (
                            <motion.div initial={{ x: '10%' }} animate={{ x: '0' }}>
                                <Typography as="h1" className="font-normal">
                                    {hero.title}
                                </Typography>
                            </motion.div>
                        )}
                        <motion.div initial={{ y: '-10%' }} animate={{ y: '0' }}>
                            <div className="mt-7">
                                <Button asChild type={`button`}>
                                    <Link href={route('products.search-page')}>{t('homepage.hero.action')}</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
