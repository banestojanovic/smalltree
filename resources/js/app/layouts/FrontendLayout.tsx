import Cart from '@/app/layouts/_partials/frontendLayout/Cart';
import FooterNavlinks from '@/app/layouts/_partials/frontendLayout/FooterNavbar';
import TeaShopBenefits from '@/app/layouts/_partials/frontendLayout/TeaShopBenefits';
import { PropsWithChildren, ReactNode } from 'react';
import FlashMessages from '../components/ui/FlashMessages';
import MainNavbar from './_partials/frontendLayout/MainNavbar';
import TopNavbar from './_partials/frontendLayout/TopNavbar';

export default function FrontendLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-background text-black/50 dark:bg-black dark:text-white/50">
            <nav className="border-t-[8px] border-primary">
                <TopNavbar />
                <MainNavbar />
            </nav>

            {header && (
                <header className="">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>

            <footer className={route().current() !== 'home' ? '' : ''}>
                <TeaShopBenefits />
                <FooterNavlinks />
            </footer>

            <Cart />
            <FlashMessages />
        </div>
    );
}
