import NavLink from '@/app/components/NavLink';
import { Button } from '@/app/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    const { t } = useTranslation();

    const menu = [
        {
            id: 'home',
            title: t('menu.top.home'),
            link: route('home'),
            active: route().current('home'),
        },
        {
            id: 'teas',
            title: t('menu.top.teas'),
            link: route('search.type', { type: 'cajevi' }),
            active: route().current('search.type', { type: 'cajevi' }),
        },
        {
            id: 'accessories',
            title: t('menu.top.accessories'),
            link: route('search.type', { type: 'dodaci' }),
            active: route().current('search.type', { type: 'dodaci' }),
        },
        {
            id: 'promotions',
            title: t('menu.top.promotions'),
            link: route('search.show'),
            active: route().current('search.show'),
        },
        {
            id: 'blog',
            title: t('menu.top.blog'),
            link: route('posts.index'),
            active: route().current('posts.index'),
        },
        {
            id: 'contact',
            title: t('menu.top.contact'),
            link: route('contact.show'),
            active: route().current('contact.show'),
        },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div className="relative">
                    <Button variant="ghost" className={`w-full px-2.5`}>
                        <svg className={`size-5!`} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    {menu.map((item, index: number) => (
                        <SheetClose asChild key={item.id}>
                            <NavLink href={item.link} active={item.active}>
                                <motion.span initial={{ y: 30 }} animate={{ y: 0 }} transition={{ delay: index * 0.05 }}>
                                    {item.title}
                                </motion.span>
                            </NavLink>
                        </SheetClose>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
