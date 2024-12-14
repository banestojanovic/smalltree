import { Button } from '@/app/components/ui/button';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="mt-10 border-b border-gray-500 pb-10">
            <div className="container grid grid-cols-1 md:grid-cols-2">
                <div className="flex items-center">
                    <div className="">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Special Promotion or event or anything important
                        </h1>
                        <div className="mt-7">
                            <Button>{t('enums.homepage.hero.buy_now')}</Button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="">
                        <img
                            className="h-80 w-full rounded-md object-cover sm:h-[25rem]"
                            src="/images/image-placeholder.jpg"
                            alt="imge placeholder"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
