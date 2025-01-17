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
            onFinish: () => reset('email'),
        });
    };

    return (
        <div className="space-y-2">
            <Typography as="h4" className="mb-5 leading-8">
                {t('newsletter.title')}
            </Typography>

            <form onSubmit={submit}>
                <div className={`relative flex w-full items-center gap-2`}>
                    <div className={`relative flex w-full items-center rounded-lg bg-white pl-10 ring-primary ring-offset-1 has-[:focus]:ring`}>
                        <svg viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute left-4 size-6 text-foreground/60`}>
                            <path
                                d="M1.2167 12.4298C1.0837 12.1936 1 11.8813 1 11.5455V1.44264M20 1.42313V11.546C20 11.8736 19.924 12.1746 19.791 12.4108M7.05689 7.04096L8.75765 8.61488C8.84905 8.69841 8.94029 8.77082 9.03135 8.8321C9.95568 9.51815 11.0325 9.51815 11.9532 8.82799C12.0405 8.7674 12.1325 8.69088 12.2162 8.61488L13.9282 7.03326"
                                stroke="black"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.9283 7.03329L19.7911 12.4108C19.6309 12.7045 19.3839 12.8951 19.1097 12.8951H1.89053C1.62401 12.8951 1.38061 12.7158 1.2168 12.4298L7.05699 7.041"
                                stroke="black"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 1.42313L13.9277 7.03327L12.2156 8.61489C12.1319 8.69141 12.0411 8.76741 11.9538 8.82851C11.0325 9.51816 9.95619 9.51816 9.03187 8.83211C8.93498 8.7669 8.8433 8.69427 8.75765 8.61489L7.05689 7.04097L1 1.44214L1.05341 1.36613C1.21259 1.13711 1.42981 1 1.66603 1H19.3494C19.5738 1 19.791 1.13351 19.9466 1.34713C19.9661 1.37041 19.9839 1.39575 20 1.42313Z"
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
                            className="h-12 w-full border-none bg-transparent text-foreground shadow-none outline-none placeholder:italic focus-visible:ring-0"
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

            <div className="flex items-center space-x-8 pt-8">
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
