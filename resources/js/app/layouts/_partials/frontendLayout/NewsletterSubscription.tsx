import InputError from '@/app/components/InputError';
import { Button } from '@/app/components/ui/button';
import { Typography } from '@/app/components/ui/typography';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

const NewsletterSubscription = () => {
    const { t } = useTranslation();

    const { data, setData, post, errors, reset } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('subscribers.store'), {
            preserveScroll: true,
            onFinish: () => reset('email'),
        });
    };

    return (
        <div className="space-y-2">
            <Typography as="h4" className="mb-5 leading-8">
                {t('newsletter.title')}
            </Typography>

            <form onSubmit={submit}>
                <div className={`relative flex w-full flex-col gap-2 lg:flex-row lg:items-center`}>
                    <div className={`relative flex w-full items-center rounded-lg bg-white px-2 pl-10 ring-primary ring-offset-1 has-focus:ring-3`}>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute left-4`}>
                            <path d="M5.14575 7.0415C12.5595 14.3941 13.176 14.1319 20.8541 7.0415" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                                d="M20.8542 4.604H5.14591C3.9493 4.604 2.97925 5.57405 2.97925 6.77067V19.229C2.97925 20.4256 3.9493 21.3957 5.14591 21.3957H20.8542C22.0509 21.3957 23.0209 20.4256 23.0209 19.229V6.77067C23.0209 5.57405 22.0509 4.604 20.8542 4.604Z"
                                stroke="black"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('newsletter.email_placeholder')}
                            className="h-12 w-full border-none bg-transparent text-sm text-foreground shadow-none outline-hidden placeholder:italic placeholder:text-foreground focus-visible:ring-0"
                        />
                    </div>
                    <Button type="submit" className={`h-12 px-8`}>
                        {t('newsletter.subscribe')}
                    </Button>
                </div>
                <InputError message={errors.email} className="mt-1" />
            </form>

            <Typography as="p" className="text-sm">
                {t('newsletter.button_text')}
            </Typography>

            <div className="flex pt-8 max-lg:flex-col lg:items-center lg:space-x-8">
                <Typography as="p" className="font-medium">
                    {t('footer.follow_us')}
                </Typography>
                <div className={`space-x-3 text-sm`}>
                    <Link href="https://instagram.com" className="hover:underline">
                        {t('footer.instagram')}
                    </Link>
                    <span>&</span>
                    <Link href="https://facebook.com" className="hover:underline">
                        {t('footer.facebook')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
