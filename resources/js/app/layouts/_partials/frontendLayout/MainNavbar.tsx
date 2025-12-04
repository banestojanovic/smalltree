import CartButton from '@/app/components/application/product/CartButton';
import NavLink from '@/app/components/NavLink';
import MobileMenu from '@/app/layouts/_partials/frontendLayout/MobileMenu';
import MobileProductSearch from '@/app/layouts/_partials/frontendLayout/MobileProductSearch';
import ProductSearch from '@/app/layouts/_partials/frontendLayout/ProductSearch';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function TopNavbar() {
    const { t } = useTranslation();
    return (
        <>
            <div className="hidden bg-white md:block">
                <div className="container">
                    <div className="flex h-12 items-center justify-between sm:h-16">
                        <div className="hidden items-center justify-between sm:flex">
                            <nav className="flex space-x-4 text-[15px] uppercase lg:space-x-8">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    <motion.span initial={{ x: 30 }} animate={{ x: 0 }}>
                                        {t('menu.top.home')}
                                    </motion.span>
                                </NavLink>

                                <NavLink href={route('search.type', { type: 'cajevi' })} active={route().current('search.type', { type: 'cajevi' })}>
                                    <motion.span initial={{ x: 30 }} animate={{ x: 0 }} transition={{ delay: 0.05 }}>
                                        {t('menu.top.teas')}
                                    </motion.span>
                                </NavLink>

                                <NavLink href={route('search.type', { type: 'dodaci' })} active={route().current('search.type', { type: 'dodaci' })}>
                                    <motion.span initial={{ x: 30 }} animate={{ x: 0 }} transition={{ delay: 0.08 }}>
                                        {t('menu.top.accessories')}
                                    </motion.span>
                                </NavLink>

                                <NavLink href={route('search.type', { type: 'promocije' })} active={route().current('search.type', { type: 'promocije' })}>
                                    <motion.span initial={{ x: 30 }} animate={{ x: 0 }} transition={{ delay: 0.1 }}>
                                        {t('menu.top.promotions')}
                                    </motion.span>
                                </NavLink>

                                <NavLink href={route('posts.index')} active={route().current('posts.index')}>
                                    <motion.span initial={{ x: 30 }} animate={{ x: 0 }} transition={{ delay: 0.12 }}>
                                        {t('menu.top.blog')}
                                    </motion.span>
                                </NavLink>

                                <NavLink href={route('contact.show')} active={route().current('contact.show')}>
                                    <motion.span initial={{ x: 30 }} animate={{ x: 0 }} transition={{ delay: 0.14 }}>
                                        {t('menu.top.contact')}
                                    </motion.span>
                                </NavLink>
                            </nav>
                        </div>

                        <motion.div className="hidden items-center justify-end lg:flex lg:w-1/3" initial={{ x: -30 }} animate={{ x: 0 }}>
                            <ProductSearch />
                        </motion.div>

                        <div className="flex w-full items-center justify-between space-x-2 sm:hidden">
                            <motion.div initial={{ x: -30 }} animate={{ x: 0 }} className={`flex items-center space-x-0`}>
                                <MobileMenu />
                                <MobileProductSearch />
                            </motion.div>
                            <motion.div initial={{ x: 30 }} animate={{ x: 0 }}>
                                <CartButton size={`small`} />
                            </motion.div>
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
