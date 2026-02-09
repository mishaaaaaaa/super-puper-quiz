'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import CircularProgressBar from '@/components/ui/circle-progress';

export const AnalyzingScreen = () => {
    const t = useTranslations('analyzing');
    const router = useRouter();

    const actionAfterLoading = useCallback(() => {
        router.push('/email');
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col justify-center items-center">
            <CircularProgressBar afterAction={actionAfterLoading} />
            <span className="mt-5 text-xl font-semibold font-albert">{t('title')}</span>
        </div>
    );
};
