import InputError from '@/app/components/InputError';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Typography } from '@/app/components/ui/typography';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

const NewsletterSubscription = () => {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('subscribers.store'), {
            onFinish: () => reset('email'),
        });
    };

    return (
        <div className="">
            <Typography as="h3" className="mb-5 !leading-8">
                {t('newsletter.title')}
            </Typography>

            <div>
                <form onSubmit={submit} className="mt-2 flex items-center gap-x-2">
                    <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder={t('newsletter.email_placeholder')} className="bg-white" />
                    <InputError message={errors.email} className="mt-1" />
                    <Button size="sm" type="submit">
                        {t('newsletter.subscribe')}
                    </Button>
                </form>
            </div>

            <Typography as="p" className="mt-3">
                {t('newsletter.button_text')}
            </Typography>

            <div className="mt-7 flex items-center">
                <Typography as="p" className="">
                    {t('footer.follow_us')}
                </Typography>
                <Link href="https://instagram.com" className="ml-7 hover:underline">{t('footer.instagram')}</Link>
                <Link href="https://facebook.com" className="ml-3 hover:underline">{t('footer.facebook')}</Link>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
