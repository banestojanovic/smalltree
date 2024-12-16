import NavLink from '@/app/components/NavLink';
import ResponsiveNavLink from '@/app/components/ResponsiveNavLink';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TopNavbar() {
    const { t } = useTranslation();
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <>
            <div className="border-b-2 border-gray-200">
                <div className="container">
                    <div className="flex h-12 items-center justify-between">
                        <div className="hidden items-center justify-between sm:flex">
                            <div className="flex space-x-8">
                                <NavLink
                                    href={route('home')}
                                    active={route().current('home')}
                                >
                                    {t('enums.menu.top.products')}
                                </NavLink>

                                <NavLink href={route('home')} active={false}>
                                    {t('enums.menu.top.teas')}
                                </NavLink>

                                <NavLink href={route('home')} active={false}>
                                    {t('enums.menu.top.accessories')}
                                </NavLink>

                                <NavLink href={route('home')} active={false}>
                                    {t('enums.menu.top.blog')}
                                </NavLink>

                                <NavLink href={route('home')} active={false}>
                                    {t('enums.menu.top.contact')}
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Input
                                type="search"
                                placeholder={t('enums.menu.top.search')}
                            />
                        </div>

                        {/* Hamburger */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink
                        href={route('home')}
                        active={route().current('home')}
                    >
                        Products
                    </ResponsiveNavLink>
                </div>
            </div>
        </>
    );
}
