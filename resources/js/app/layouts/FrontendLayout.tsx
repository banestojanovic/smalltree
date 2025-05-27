import Cart from '@/app/layouts/_partials/frontendLayout/Cart';
import FooterNavlinks from '@/app/layouts/_partials/frontendLayout/FooterNavbar';
import TeaShopBenefits from '@/app/layouts/_partials/frontendLayout/TeaShopBenefits';
import PromotionsFull from '@/app/pages/home/_partials/PromotionsFull';
import TopPosts from '@/app/pages/home/_partials/TopPosts';
import { PageProps } from '@/app/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, ReactNode } from 'react';
import FlashMessages from '../components/ui/FlashMessages';
import MainNavbar from './_partials/frontendLayout/MainNavbar';
import TopNavbar from './_partials/frontendLayout/TopNavbar';

export default function FrontendLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const promoPackages =
        usePage<
            PageProps<{
                promoPackages?: {
                    title: Record<string, string>;
                    subtitle: Record<string, string>;
                    bg_image: string;
                    products: App.Data.ProductData[];
                }[];
            }>
        >().props?.global?.promoPackages ?? [];

    const posts = usePage<PageProps<{ posts: App.Data.PostData[] }>>().props?.global?.posts ?? [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { notification, notificationDismissed } =
        usePage<
            PageProps<{
                notifications: App.Data.SharedData;
            }>
        >().props?.global ?? null;

    const { post } = useForm();

    const dismissNotification = () => {
        post(route('notifications.dismiss'));
    };

    return (
        <div className="bg-background relative min-h-screen">
            <AnimatePresence>
                {notification && !notificationDismissed && (
                    <motion.div
                        className={`fixed bottom-4 left-1/2 z-50 w-11/12 -translate-x-1/2 lg:max-w-7xl`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 10, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: 'spring' }}
                    >
                        <Alert className={`bg-primary`}>
                            <AlertDescription className={`flex items-center justify-between text-white lg:text-base`}>
                                <span>{notification}</span>
                                <Button type={`button`} variant={`ghost`} onClick={dismissNotification}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-x-icon lucide-x"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </Button>
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="border-primary bg-primary relative flex h-[6px] w-full border-t-[6px] max-md:mt-10"></div>
            <TopNavbar />
            <MainNavbar />

            {header && (
                <header>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>

            <section className={`${route().current() !== 'home.index' ? 'max-lg:hidden' : ''}`}>
                <PromotionsFull promoPackages={promoPackages} />

                {route().current() !== 'posts.index' && route().current() !== 'posts_by_category.index' && route().current() !== 'posts.show' && <TopPosts posts={posts} />}
            </section>

            <footer className={`${route().current() !== 'home.index' ? 'max-lg:pt-12' : ''}`}>
                <TeaShopBenefits />
                <FooterNavlinks />
            </footer>

            <Cart />
            <FlashMessages />
        </div>
    );
}
