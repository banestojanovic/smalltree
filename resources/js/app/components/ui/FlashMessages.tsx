'use client';

import { ToastAction } from '@/app/components/ui/toast';
import { Toaster } from '@/app/components/ui/toaster';
import { useToast } from '@/app/hooks/use-toast';
import { PageProps } from '@/app/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function FlashedMessages() {
    const { t } = useTranslation();
    const { flash, errors } = usePage<PageProps>().props;
    const { toast } = useToast();
    const formErrorsCount = Object.keys(errors).length;

    useEffect(() => {
        if (flash.success) {
            toast({
                title: t('enums.flash.success'),
                description: flash.success,
                // action: (
                //     <ToastAction altText={t('enums.flash.dismiss')}>
                //         {t('enums.flash.dismiss')}
                //     </ToastAction>
                // ),
            });
        }

        if (flash.error) {
            toast({
                title: t('enums.flash.error'),
                description: flash.error,
                variant: 'destructive',
                // action: (
                //     <ToastAction altText={t('enums.flash.dismiss')}>
                //         {t('enums.flash.dismiss')}
                //     </ToastAction>
                // ),
            });
        }

        if (formErrorsCount > 0) {
            toast({
                title: t('enums.flash.form_errors'),
                description: t('enums.flash.there_are_some_form_errors'),
                variant: 'destructive',
                // action: (
                //     <ToastAction altText={t('enums.flash.dismiss')}>
                //         {t('enums.flash.dismiss')}
                //     </ToastAction>
                // ),
            });
        }
    }, [flash, errors, formErrorsCount, toast, t]);

    return <Toaster />;
}
