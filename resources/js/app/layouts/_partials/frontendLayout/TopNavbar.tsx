import ApplicationLogo from '@/app/components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CartButton from './CartButton';

export default function TopNavbar() {
    const { t } = useTranslation();

    return (
        <div className="border-b-2 border-gray-200">
            <div className="container">
                <div className="grid h-24 grid-cols-3 gap-x-4">
                    <div className="flex items-center gap-x-5">
                        <p className="text-sm">+391 00 000 000</p>
                        <p className="text-sm">contact@smalltree.com</p>
                        <p className="text-sm">{t('enums.menu.top.locations')}</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-20 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end gap-x-5">
                        <p className="text-sm">{t('enums.menu.top.favorites')}</p>
                        <CartButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
