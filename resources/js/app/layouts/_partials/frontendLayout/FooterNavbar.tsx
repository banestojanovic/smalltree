import ApplicationLogo from '@/app/components/ApplicationLogo';
import { Typography } from '@/app/components/ui/typography';
import NewsletterSubscription from '@/app/layouts/_partials/frontendLayout/NewsletterSubscription';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const FooterNavlinks = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="mt-7 border-b border-t border-gray-300 bg-gray-100 pb-5 sm:pb-0">
                <div className="container mt-7 flex w-full items-center md:mt-0 lg:justify-center">
                    <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-[40%_auto_auto] sm:place-items-center">
                        <div className="border-gray-300 md:border-l md:border-r">
                            <NewsletterSubscription />
                        </div>

                        <div className="">
                            <Typography as="h4" className="">
                                OUR STORES
                            </Typography>

                            <ul className="mt-5 flex flex-col gap-3">
                                <li>
                                    <Typography as="h4" className="">
                                        Store One
                                    </Typography>
                                    <Typography as="p" className="">
                                        Street Address 23, State 1, Zip Code
                                    </Typography>
                                </li>

                                <li>
                                    <Typography as="h4" className="">
                                        Store One
                                    </Typography>
                                    <Typography as="p" className="">
                                        Street Address 23, State 1, Zip Code
                                    </Typography>
                                </li>
                            </ul>
                        </div>

                        <div className="">
                            <Typography as="h4" className="">
                                ADDITIONAL INFO
                            </Typography>

                            <ul className="mt-5 flex flex-col gap-3">
                                <li>
                                    <Link href={'#'}>About us</Link>
                                </li>
                                <li>
                                    <Link href={'#'}>Networking</Link>
                                </li>
                                <li>
                                    <Link href={'#'}>Stories</Link>
                                </li>
                                <li>
                                    <Link href={'#'}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-32 items-center bg-gray-200 py-7 sm:py-0 md:h-20">
                <div className="container flex w-full flex-col items-center justify-center gap-3 md:flex-row lg:justify-between">
                    <div>
                        <Link href="/">
                            <ApplicationLogo className="block h-12 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>

                    <ul className="flex items-center justify-end gap-5">
                        <li>
                            <Link href={'#'}>Terms & Conditions</Link>
                        </li>

                        <li>
                            <Link href={'#'}>Privacy Policy</Link>
                        </li>

                        <li>
                            <Link href={'#'}>All rights Reserved 2025</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default FooterNavlinks;
