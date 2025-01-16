import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import FieldGroup from '@/app/components/ui/FieldGroup';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Typography } from '@/app/components/ui/typography';
import FrontendLayout from '@/app/layouts/FrontendLayout';
import { useTranslation } from 'react-i18next';

interface ShopAddressCardProps {
    shop: { name: string; address: string; phone: string; email: string; working_hours: string };
}

const ContactUsPage = () => {
    const { t } = useTranslation();
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact us" />
            <div className="container py-10 sm:py-20">
                <Typography as="h3">{t('checkout.contact_info')}</Typography>
                <Typography as="p">{t('checkout.contact_info')}</Typography>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                    <section>
                        <form onSubmit={submit} className="">
                            <div>
                                <div className="mt-7 space-y-7">
                                    <FieldGroup label="Name" name="name" error={errors.name}>
                                        <Input autoFocus={true} id="name" placeholder="Full Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    </FieldGroup>

                                    <FieldGroup label="Email" name="email" error={errors.email}>
                                        <Input id="email" type="email" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    </FieldGroup>

                                    <FieldGroup label="Phone" name="phone" error={errors.phone}>
                                        <Input id="phone" placeholder="Your Phone Number" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    </FieldGroup>

                                    <FieldGroup label="Message" name="message" error={errors.message}>
                                        <Textarea id="message" rows={7} placeholder="Enter your message" value={data.message} onChange={(e) => setData('message', e.target.value)} />
                                    </FieldGroup>

                                    <div className="mt-10">
                                        <Button type="submit" className="">
                                            {t('contact.submit_button')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>

                    <section>
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            <img className={'h-60 w-full rounded-lg object-cover lg:h-[285px] lg:w-[229px]'} src="/images/1.png" alt="image 1" />
                            <img className={'h-60 w-full rounded-lg object-cover lg:h-[285px] lg:w-[229px]'} src="/images/2.png" alt="image 1" />
                            <img className={'h-60 w-full rounded-lg object-cover lg:h-[285px] lg:w-[229px]'} src="/images/3.png" alt="image 1" />
                            <img className={'h-60 w-full rounded-lg object-cover lg:h-[285px] lg:w-[229px]'} src="/images/4.png" alt="image 1" />
                            <img className={'h-60 w-full rounded-lg object-cover lg:h-[285px] lg:w-[229px]'} src="/images/5.png" alt="image 1" />
                            <img className={'h-60 w-full rounded-lg object-cover lg:h-[285px] lg:w-[229px]'} src="/images/6.png" alt="image 1" />
                        </div>
                    </section>
                </div>

                {/*    Shops Addresses */}
                <div className="mt-7 grid grid-cols-1 gap-7 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
                    <ShopAddressCard
                        shop={{
                            name: '',
                            address: "Bulevar Mihajla Pupina 4, Beograd,'\n" + "Pozicija štanda: Prizemlje, nivo 0.,'\n" + "'Ulaz sa Brankovog mosta ispred lokala Go Sushi i IQOSI'",
                            phone: '063 40 46 96 ',
                            email: 'office@smalltree.rs \n',
                            working_hours: '10 – 22 h',
                        }}
                    />
                    <ShopAddressCard
                        shop={{
                            name: '',
                            address: "Bulevar Mihajla Pupina 4, Beograd,'\n" + "Pozicija štanda: Prizemlje, nivo 0.,'\n" + "'Ulaz sa Brankovog mosta ispred lokala Go Sushi i IQOSI'",
                            phone: '063 40 46 96 ',
                            email: 'office@smalltree.rs \n',
                            working_hours: '10 – 22 h',
                        }}
                    />

                    <ShopAddressCard
                        shop={{
                            name: '',
                            address: "Bulevar Mihajla Pupina 4, Beograd,'\n" + "Pozicija štanda: Prizemlje, nivo 0.,'\n" + "'Ulaz sa Brankovog mosta ispred lokala Go Sushi i IQOSI'",
                            phone: '063 40 46 96 ',
                            email: 'office@smalltree.rs \n',
                            working_hours: '10 – 22 h',
                        }}
                    />
                </div>
            </div>
        </>
    );
};

const ShopAddressCard = ({ shop }: ShopAddressCardProps) => {
    return (
        <Card>
            <CardHeader>
                <img className="h-60 w-full rounded-lg object-cover p-1.5 sm:h-72" src="/images/shop-map.png" alt="shop map" />
                <CardTitle>
                    <Typography as="h4">{shop.name}</Typography>
                    {/*<p className="mt-1 text-sm !font-normal tracking-widest">{shop.date_created}</p>*/}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-4 font-title">{shop.address}</p>
                <p className="line-clamp-4 font-title">{shop.phone}</p>
                <p className="line-clamp-4 font-title">{shop.email}</p>
                <p className="line-clamp-4 font-title">{shop.working_hours}</p>
                <p className="line-clamp-4 font-title"></p>
            </CardContent>

            <CardFooter className="mt-auto flex items-center">
                <Button variant="link" className="!px-0">
                    See on map
                </Button>
            </CardFooter>
        </Card>
    );
};

ContactUsPage.layout = (page: ReactNode) => <FrontendLayout>{page}</FrontendLayout>;

export default ContactUsPage;
