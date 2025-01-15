import NavLink from '@/app/components/NavLink';
import MobileMenu from '@/app/layouts/_partials/frontendLayout/MobileMenu';
import ProductSearch from '@/app/layouts/_partials/frontendLayout/ProductSearch';
import { useTranslation } from 'react-i18next';

export default function TopNavbar() {
    const { t } = useTranslation();
    return (
        <>
            <div className="bg-white">
                <div className="container">
                    <div className="flex h-16 items-center justify-between">
                        <div className="hidden items-center justify-between sm:flex">
                            <div className="flex space-x-4 text-[15px] uppercase lg:space-x-8">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    {t('menu.top.home')}
                                </NavLink>

                                <NavLink href={route('products.search-page')} active={route().current('products.search-page')}>
                                    {t('menu.top.teas')}
                                </NavLink>

                                <NavLink href={route('products.search-page')} active={false}>
                                    {t('menu.top.accessories')}
                                </NavLink>

                                <NavLink href={route('products.search-page')} active={false}>
                                    {t('menu.top.promotions')}
                                </NavLink>

                                <NavLink href={route('posts.index')} active={route().current('posts.index')}>
                                    {t('menu.top.blog')}
                                </NavLink>

                                <NavLink href={route('contact.show')} active={false}>
                                    {t('menu.top.contact')}
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center justify-end lg:w-1/3">
                            <ProductSearch />
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <MobileMenu />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
