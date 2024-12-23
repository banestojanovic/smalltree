import ApplicationLogo from '@/app/components/ApplicationLogo';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Typography } from '@/app/components/ui/typography';
import { Link } from '@inertiajs/react';
import { Mail, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FooterNavlinks = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="mt-7 border-b border-t border-gray-300 bg-gray-100 pb-5 sm:pb-0">
                <div className="container flex w-full items-center lg:justify-center">
                    <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-[40%_auto_auto] sm:place-items-center">
                        <div className="border-gray-300 p-5 md:border-l md:border-r">
                            <Typography as="h3" className="m-auto inline-flex gap-x-2">
                                <Mail className="mt-2 shrink-0" />
                                <span>Save 10% on your next purchase!</span>
                            </Typography>

                            <div className="mt-2 flex items-center">
                                <Input placeholder="Email.." className="bg-white" />
                                <Button size="sm">Subscribe</Button>
                            </div>

                            <Typography as="p" className="mt-5 inline-flex gap-x-2 font-semibold">
                                <Star className="mt-2 shrink-0 fill-black" />
                                <span>Special offer for the member of our Tea Shop club in your inbox</span>
                            </Typography>
                        </div>

                        <div className="">
                            <Typography as="h3" className="">
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
                            <Typography as="h3" className="">
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
