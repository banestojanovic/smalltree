import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Typography } from '@/app/components/ui/typography';
import NewsletterSubscription from '@/app/layouts/_partials/frontendLayout/NewsletterSubscription';
import { Link } from '@inertiajs/react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useTranslation } from 'react-i18next';

const FooterNavlinks = () => {
    const { t } = useTranslation();

    const stores = [
        {
            city: 'Čajdžinica - Beograd,',
            address: 'Svetog Save 12,',
            latitude: '44.8014506981761',
            longitude: '20.467196357670886',
            direction:
                'https://www.google.com/maps/place/Salon+de+th%C3%A9+by+Small+Tree/@44.8012924,20.4645997,17z/data=!3m1!4b1!4m6!3m5!1s0x475a700a36c7f3e9:0xca244ed82b9c2d6b!8m2!3d44.8012886!4d20.4671746!16s%2Fg%2F11b5pj9g43?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D',
        },
        {
            city: 'TC Ušće, Beograd',
            address: 'Bul. Mihajla Pupina 4,',
            latitude: '44.81558910915537',
            longitude: '20.43684835437302',
            direction:
                'https://www.google.com/maps/place/U%C5%A0%C4%86E+Shopping+Center/@44.8155166,20.4311953,17z/data=!3m1!4b1!4m6!3m5!1s0x475a655bae3423a7:0xd9fb62470be09800!8m2!3d44.8155129!4d20.4360662!16s%2Fg%2F11x97z8_n?entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D',
        },
        {
            city: 'Sedište firme - Beograd,',
            address: 'Jurija Gagarina 115/111',
            latitude: '44.80215996074898',
            longitude: '20.391877369714173',
        },
    ];

    const footerNav = [
        {
            id: 'blog',
            title: 'menu.footer.blog',
            route: route('posts.index'),
        },
        {
            id: 'about',
            title: 'menu.footer.about',
            route: route('page.about.show'),
        },
        {
            id: 'contact',
            title: 'menu.footer.contact',
            route: route('contact.show'),
        },
        {
            id: 'privacy_policy',
            title: 'menu.footer.privacy_policy',
            route: route('page.privacy_policy.show'),
        },
        {
            id: 'terms_of_service',
            title: 'menu.footer.terms_of_service',
            route: route('page.terms.show'),
        },
    ];

    return (
        <>
            <div className="bg-gray-dark py-10 text-white lg:py-20">
                <div className="container flex w-full items-center md:mt-0 lg:justify-center">
                    <div className="grid w-full grid-cols-1 items-start gap-14 sm:grid-cols-[40%_auto_auto]">
                        <NewsletterSubscription />

                        <div>
                            <Typography as="h4" className="">
                                {t('footer.our_stores')}
                            </Typography>

                            <ul className="mt-7 flex flex-col gap-3">
                                {stores.map((store, index) => (
                                    <li key={index} className={`text-md leading-6`}>
                                        {store.address}
                                        <div className="flex items-baseline gap-x-3">
                                            {store.city}

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button type={`button`} className={`flex items-baseline space-x-1 underline`}>
                                                        <span>{t('footer.see_on_map')}</span>
                                                        <svg className={`relative top-0.5`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8 4.25C7.55499 4.25 7.11998 4.38196 6.74997 4.62919C6.37996 4.87643 6.09157 5.22783 5.92127 5.63896C5.75097 6.0501 5.70642 6.5025 5.79323 6.93895C5.88005 7.37541 6.09434 7.77632 6.40901 8.09099C6.72368 8.40566 7.12459 8.61995 7.56105 8.70677C7.9975 8.79358 8.4499 8.74903 8.86104 8.57873C9.27217 8.40843 9.62357 8.12004 9.87081 7.75003C10.118 7.38002 10.25 6.94501 10.25 6.5C10.25 5.90326 10.0129 5.33097 9.59099 4.90901C9.16903 4.48705 8.59674 4.25 8 4.25ZM8 8.25C7.65388 8.25 7.31554 8.14736 7.02775 7.95507C6.73997 7.76278 6.51566 7.48947 6.38321 7.1697C6.25076 6.84993 6.2161 6.49806 6.28363 6.15859C6.35115 5.81913 6.51782 5.50731 6.76256 5.26256C7.00731 5.01782 7.31913 4.85115 7.65859 4.78363C7.99806 4.7161 8.34993 4.75076 8.6697 4.88321C8.98947 5.01566 9.26278 5.23997 9.45507 5.52775C9.64736 5.81554 9.75 6.15388 9.75 6.5C9.75 6.72981 9.70473 6.95738 9.61679 7.1697C9.52884 7.38202 9.39994 7.57493 9.23744 7.73744C9.07493 7.89994 8.88202 8.02884 8.6697 8.11679C8.45738 8.20473 8.22981 8.25 8 8.25ZM8 1.25C6.60807 1.25149 5.27358 1.80509 4.28933 2.78933C3.30509 3.77358 2.75149 5.10807 2.75 6.5C2.75 8.40125 3.63563 10.4244 5.3125 12.3512C6.0711 13.2278 6.9249 14.0173 7.85813 14.705C7.9001 14.7343 7.95006 14.75 8.00125 14.75C8.05244 14.75 8.1024 14.7343 8.14437 14.705C9.07673 14.0171 9.92968 13.2277 10.6875 12.3512C12.3631 10.4244 13.25 8.40125 13.25 6.5C13.2485 5.10807 12.6949 3.77358 11.7107 2.78933C10.7264 1.80509 9.39193 1.25149 8 1.25ZM10.3188 12.0144C9.62028 12.8143 8.84349 13.5423 8 14.1875C7.15638 13.5415 6.37959 12.8127 5.68125 12.0119C4.57188 10.7375 3.25 8.74375 3.25 6.5C3.25 5.24022 3.75045 4.03204 4.64124 3.14124C5.53204 2.25044 6.74022 1.75 8 1.75C9.25978 1.75 10.468 2.25044 11.3588 3.14124C12.2496 4.03204 12.75 5.24022 12.75 6.5C12.75 8.74375 11.4281 10.7375 10.3188 12.0144Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </button>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>{store.address}</DialogTitle>
                                                        <DialogDescription className={`flex items-center space-x-1`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                                                <path d="M426.92-187.54v-221.67l54.46-155.56q2.7-4.85 6.43-7.73 3.73-2.88 11.57-2.88h285.85q6.72 0 11.51 2.88 4.8 2.88 6.49 7.73l54.46 155.56v221.67q0 7.1-4.83 11.93-4.84 4.84-11.94 4.84h-6.46q-7.09 0-11.93-4.84-4.84-4.83-4.84-11.93v-50.92H466.92v50.92q0 7.1-4.83 11.93-4.84 4.84-11.94 4.84h-6.46q-7.09 0-11.93-4.84-4.84-4.83-4.84-11.93Zm49.23-254h332.31L774.31-540h-264l-34.16 98.46Zm-13.84 35.39v132.3-132.3Zm63.07 98.46q15.04 0 25.22-10.18 10.17-10.17 10.17-25.21 0-15.04-10.17-25.21-10.18-10.17-25.22-10.17-15.03 0-25.21 10.17Q490-358.12 490-343.08q0 15.04 10.17 25.21 10.18 10.18 25.21 10.18Zm233.85 0q15.04 0 25.21-10.18 10.18-10.17 10.18-25.21 0-15.04-10.18-25.21-10.17-10.17-25.21-10.17-15.04 0-25.21 10.17-10.17 10.17-10.17 25.21 0 15.04 10.17 25.21 10.17 10.18 25.21 10.18ZM182.31-180v-12.31L250-260q-56.15 0-101.92-24.62-45.77-24.61-45.77-75.38v-340q0-40.62 59.77-60.31Q221.85-780 342.31-780q121.84 0 180.92 19.46 59.08 19.46 59.08 60.54v53.85h-40V-700h-400v280h213.84v240H182.31Zm20-144.62q15.04 0 25.21-10.17 10.17-10.17 10.17-25.21 0-15.04-10.17-25.21-10.17-10.17-25.21-10.17-15.04 0-25.21 10.17-10.18 10.17-10.18 25.21 0 15.04 10.18 25.21 10.17 10.17 25.21 10.17Zm260 50.77h360v-132.3h-360v132.3Z" />
                                                            </svg>
                                                            <a
                                                                href={
                                                                    store?.direction
                                                                        ? store.direction
                                                                        : `https://www.google.com/maps/place/${parseFloat(store.latitude)},${parseFloat(store.longitude)}`
                                                                }
                                                                target={`_blank`}
                                                                rel={`noreferrer`}
                                                                className={`underline`}
                                                            >
                                                                {t('footer.see_directions')}
                                                            </a>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className={`h-72 w-full`}>
                                                        <APIProvider apiKey={`AIzaSyAvcVTi-sOrkQdEOJ-QIazagXeiBLc6gU4`}>
                                                            <Map
                                                                className={`size-full`}
                                                                defaultCenter={{
                                                                    lat: parseFloat(store.latitude),
                                                                    lng: parseFloat(store.longitude),
                                                                }}
                                                                defaultZoom={14}
                                                                gestureHandling={'greedy'}
                                                                disableDefaultUI={true}
                                                            >
                                                                <Marker
                                                                    position={{
                                                                        lat: parseFloat(store.latitude),
                                                                        lng: parseFloat(store.longitude),
                                                                    }}
                                                                />
                                                            </Map>
                                                        </APIProvider>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="">
                            <Typography as="h4" className="">
                                {t('footer.additional_info')}
                            </Typography>

                            <ul className="mt-7 flex flex-col gap-2 text-[15px]">
                                {footerNav.map((nav) => (
                                    <li key={nav.id}>
                                        <Link href={nav.route} className={`hover:underline`}>
                                            {t(nav.title)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-darker flex h-full items-center bg-gray-200 py-7 text-sm text-white sm:py-12">
                <div className="container flex w-full flex-col justify-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                    <div>
                        <div>
                            © {t('footer.copyrights', { date: new Date().getFullYear() })}
                            <a href="https://dimaso.rs" target="_blank" rel="noreferrer" className={`ml-1 hover:underline`}>
                                Dimaso DOO
                            </a>
                        </div>

                        <a href="https://www.smalltree.rs/trust/" className={`mt-2 flex`}>
                            <img decoding="async" style={{ width: 200 }} src="https://verify.etrustmark.rs/cert/image.php" />
                        </a>
                    </div>

                    <div className="flex flex-col gap-2 xl:justify-end xl:gap-2">
                        <div>
                            <Typography as="p" className={`text-xs uppercase`}>
                                {t('footer.safe_purchase')}
                            </Typography>
                        </div>

                        <div className="flex flex-wrap items-start gap-2">
                            <img className="block w-12" src="/storage/site/banks/maestro.png" alt="Maestro Card" />
                            <img className="block w-14" src="/storage/site/banks/master.png" alt="Master Card" />
                            <img className="block w-14" src="/storage/site/banks/dina.png" alt="Dina Card" />
                            <img className="block w-14" src="/storage/site/banks/visa.png" alt="Visa Card" />
                            <img className="block w-10" src="/storage/site/banks/american.png" alt="American Express Card" />
                            <a href="https://www.bancaintesa.rs" target="_blank" rel={`noreferrer`}>
                                <img className="block w-40" src="/storage/site/banks/intesa.png" alt="Banca Intesa" />
                            </a>
                            <a href="https://www.mastercard.rs/sr-rs/korisnici/pronadite-karticu.html " target="_blank" rel={`noreferrer`}>
                                <img className="block w-24" src="/storage/site/banks/master_id.png" alt="Master ID Check" />
                            </a>
                            <a href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html" target="_blank" rel={`noreferrer`}>
                                <img className="block w-8" src="/storage/site/banks/visa_secure.png" alt="Visa Secure" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterNavlinks;
