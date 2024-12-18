import { Button } from '@/app/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Link } from '@inertiajs/react';
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
                    <Button variant="outline">
                        <Menu />
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{t('enums.menu.menu')}</SheetTitle>
                </SheetHeader>
                <SheetDescription className="sr-only">Cart products</SheetDescription>
                <div className="py-4">
                    <SheetClose asChild>
                        <Button variant="link" asChild className="block w-full" type="submit">
                            <Link href={route('home')}>{t('enums.menu.top.products')}</Link>
                        </Button>
                    </SheetClose>

                    <SheetClose asChild>
                        <Button variant="link" asChild className="block w-full" type="submit">
                            <Link href={route('home')}>{t('enums.menu.top.teas')}</Link>
                        </Button>
                    </SheetClose>

                    <SheetClose asChild>
                        <Button variant="link" asChild className="block w-full" type="submit">
                            <Link href={route('home')}>{t('enums.menu.top.accessories')}</Link>
                        </Button>
                    </SheetClose>

                    <SheetClose asChild>
                        <Button variant="link" asChild className="block w-full" type="submit">
                            <Link href={route('home')}>{t('enums.menu.top.blog')}</Link>
                        </Button>
                    </SheetClose>

                    <SheetClose asChild>
                        <Button variant="link" asChild className="block w-full" type="submit">
                            <Link href={route('home')}>{t('enums.menu.top.contact')}</Link>
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
