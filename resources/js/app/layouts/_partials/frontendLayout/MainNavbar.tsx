import CartButton from '@/app/components/application/product/CartButton';
import NavLink from '@/app/components/NavLink';
import MobileMenu from '@/app/layouts/_partials/frontendLayout/MobileMenu';
import MobileProductSearch from '@/app/layouts/_partials/frontendLayout/MobileProductSearch';
import ProductSearch from '@/app/layouts/_partials/frontendLayout/ProductSearch';
import { useTranslation } from 'react-i18next';

export default function TopNavbar() {
    const { t } = useTranslation();
    return (
        <>
            <div className="bg-white">
                <div className="container">
                    <div className="flex h-12 items-center justify-between sm:h-16">
                        <div className="hidden items-center justify-between sm:flex">
                            <nav className="flex space-x-4 text-[15px] uppercase lg:space-x-8">
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
                            </nav>
                        </div>

                        <div className="hidden items-center justify-end lg:flex lg:w-1/3">
                            <ProductSearch />
                        </div>

                        <div className="flex w-full items-center justify-between space-x-2 sm:hidden">
                            <div className={`flex items-center space-x-0`}>
                                <MobileMenu />
                                <MobileProductSearch />
                            </div>
                            <div>
                                <CartButton size={`small`} />
                            </div>
                        </div>
                        <div className="hidden w-full items-center justify-end space-x-2 md:flex lg:hidden">
                            <div className={`flex items-center space-x-0`}>
                                <MobileProductSearch />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
