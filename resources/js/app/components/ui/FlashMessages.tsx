'use client';

import { PageProps } from '@/app/types';
import { Toaster } from '@/components/ui/sonner';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export default function FlashedMessages() {
    const { t } = useTranslation();
    const flash = usePage<PageProps<{ flash?: PageProps['flash'] }>>().props.flash;

    useEffect(() => {
        if (flash?.success) {
            toast.success(t('enums.flash.success'), {
                description: flash.success,
            });
        }

        if (flash?.error) {
            toast.error(t('enums.flash.error'), {
                description: flash.error,
            });
        }
    }, [flash, t]);

    return <Toaster />;
}
