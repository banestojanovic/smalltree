import NavLink from '@/app/components/NavLink';
import { Button } from '@/app/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    const { t } = useTranslation();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="relative">
                    <Button variant="ghost" className={`w-full px-2.5`}>
                        <svg className={`!size-5`} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent className={`bg-white`}>
                <SheetHeader className={`text-left`}>
                    <SheetTitle className={`font-title text-3xl font-medium`}>{t('menu.menu')}</SheetTitle>
                </SheetHeader>
                <SheetDescription className="sr-only">{t('menu.menu')}</SheetDescription>
                <div className="mt-6 flex flex-col space-y-4 text-sm uppercase">
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
