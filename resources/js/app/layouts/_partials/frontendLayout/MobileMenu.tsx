import NavLink from '@/app/components/NavLink';
import { Button } from '@/app/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    const { t } = useTranslation();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="relative">
                    <Button variant="outline" className={`border-border hover:bg-border`}>
                        <Menu />
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className={`text-left`}>
                    <SheetTitle>{t('menu.menu')}</SheetTitle>
                </SheetHeader>
                <SheetDescription className="sr-only">Glavni meni</SheetDescription>
                <div className="mt-10 flex flex-col space-y-4 text-sm uppercase">
                    <SheetClose asChild>
                        <NavLink href={route('home')} active={route().current('home')}>
                            {t('menu.top.home')}
                        </NavLink>
                    </SheetClose>

                    <SheetClose asChild>
                        <NavLink href={route('home')} active={false}>
                            {t('menu.top.teas')}
                        </NavLink>
                    </SheetClose>

                    <SheetClose asChild>
                        <NavLink href={route('home')} active={false}>
                            {t('menu.top.accessories')}
                        </NavLink>
                    </SheetClose>

                    <SheetClose asChild>
                        <NavLink href={route('home')} active={false}>
                            {t('menu.top.promotions')}
                        </NavLink>
                    </SheetClose>

                    <SheetClose asChild>
                        <NavLink href={route('posts.index')} active={false}>
                            {t('menu.top.blog')}
                        </NavLink>
                    </SheetClose>

                    <SheetClose asChild>
                        <NavLink href={route('contact.show')} active={false}>
                            {t('menu.top.contact')}
                        </NavLink>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
