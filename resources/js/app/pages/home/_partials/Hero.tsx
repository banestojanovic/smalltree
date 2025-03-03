import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const Hero = ({ hero }: { hero: { title: string; subtitle: string; image: string } }) => {
    const { t } = useTranslation();

    const transition = { type: 'spring', duration: 0.3 };

    return (
        <section className="relative h-full bg-cover bg-top xl:bg-[center_top_-6rem]" style={{ backgroundImage: `url(${hero.image})` }}>
            <div className="absolute inset-0 z-0 bg-black opacity-30"></div>

            <div className="relative z-10 h-full max-lg:py-12 lg:h-[395px]">
                <div className="container flex h-full items-center text-white">
                    <div>
                        {hero?.subtitle && (
                            <motion.div initial={{ y: `-30%` }} animate={{ y: 0 }} transition={transition}>
                                <Typography as="p" className="mb-4 font-normal max-lg:text-sm">
                                    {hero.subtitle}
                                </Typography>
                            </motion.div>
                        )}
                        {hero?.title && (
                            <motion.div initial={{ x: `4%` }} animate={{ x: 0 }} transition={transition}>
                                <Typography as="h1" className="font-normal tracking-normal">
                                    {hero.title}
                                </Typography>
                            </motion.div>
                        )}
                        <motion.div initial={{ y: `30%` }} animate={{ y: '0' }} transition={transition}>
                            <div className="relative -mx-0.5 mt-7 inline-flex overflow-hidden rounded-lg p-0.5">
                                <span className="bg-primary absolute inline-flex size-full rounded-lg opacity-50 motion-safe:animate-ping"></span>
                                <Button asChild type={`button`} className={`hover:bg-primary relative z-10 h-12 hover:brightness-95`}>
                                    <Link href={route('search.show')}>{t('homepage.hero.action')}</Link>
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
