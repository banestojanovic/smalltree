import Cart from '@/app/layouts/_partials/frontendLayout/Cart';
import FooterNavlinks from '@/app/layouts/_partials/frontendLayout/FooterNavbar';
import TeaShopBenefits from '@/app/layouts/_partials/frontendLayout/TeaShopBenefits';
import PromotionsFull from '@/app/pages/home/_partials/PromotionsFull';
import TopPosts from '@/app/pages/home/_partials/TopPosts';
import { PageProps } from '@/app/types';
import { usePage } from '@inertiajs/react';
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

    return (
        <div className="min-h-screen bg-background">
            <div className="relative flex h-[6px] w-full border-t-[6px] border-primary bg-primary"></div>
            <TopNavbar />
            <MainNavbar />

            {header && (
                <header>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>

            <section>
                <PromotionsFull promoPackages={promoPackages} />

                {route().current() !== 'posts.index' && route().current() !== 'posts_by_category.index' && route().current() !== 'posts.show' && <TopPosts posts={posts} />}
            </section>

            <footer>
                <TeaShopBenefits />
                <FooterNavlinks />
            </footer>

            <Cart />
            <FlashMessages />
        </div>
    );
}
