import NavLink from '@/app/components/NavLink';
import { Input } from '@/app/components/ui/input';
import MobileMenu from '@/app/layouts/_partials/frontendLayout/MobileMenu';
import { useTranslation } from 'react-i18next';

export default function TopNavbar() {
    const { t } = useTranslation();
    return (
        <>
            <div className="border-b-2 border-gray-200">
                <div className="container">
                    <div className="flex h-12 items-center justify-between">
                        <div className="hidden items-center justify-between sm:flex">
                            <div className="flex space-x-8">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    {t('enums.menu.top.products')}
                                </NavLink>

                                <NavLink href={route('home')} active={false}>
                                    {t('enums.menu.top.teas')}
                                </NavLink>

                                <NavLink href={route('home')} active={false}>
                                    {t('enums.menu.top.accessories')}
                                </NavLink>

                                <NavLink href={route('posts.index')} active={false}>
                                    {t('enums.menu.top.blog')}
                                </NavLink>

                                <NavLink href={route('home')} active={false}>
                                    {t('enums.menu.top.contact')}
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Input type="search" placeholder={t('enums.menu.top.search')} />
                        </div>

                        {/* Hamburger */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <MobileMenu />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
