import InputError from '@/app/components/InputError';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Typography } from '@/app/components/ui/typography';
import { useForm } from '@inertiajs/react';
import { Mail, Star } from 'lucide-react';
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
        <div className='p-0 sm:p-5'>
            <Typography as="h3" className="m-auto inline-flex gap-x-2 !leading-8">
                <Mail className="mt-2 shrink-0" />
                <span>Save 10% on your next purchase!</span>
            </Typography>

            <div>
                <form onSubmit={submit} className="mt-2 flex items-center gap-x-2">
                    <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email.." className="bg-white" />
                    <InputError message={errors.email} className="mt-1" />
                    <Button size="sm" type="submit">
                        Subscribe
                    </Button>
                </form>
            </div>

            <Typography as="p" className="mt-5 inline-flex gap-x-2 font-semibold">
                <Star className="mt-2 shrink-0 fill-black" />
                <span>Special offer for the member of our Tea Shop club in your inbox</span>
            </Typography>
        </div>
    );
};

export default NewsletterSubscription;
