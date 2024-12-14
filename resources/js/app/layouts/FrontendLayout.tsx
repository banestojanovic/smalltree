import { PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import MainNavbar from './_partials/FrontendLayout/MainNavbar';
import TopNavbar from './_partials/FrontendLayout/TopNavbar';

export default function FrontendLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
            <nav className="bg-white">
                <TopNavbar />
                <MainNavbar />
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
