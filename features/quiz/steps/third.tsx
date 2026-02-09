'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Card from '@/components/ui/card';
import { getNextStep, getStepPath } from '@/lib/quiz-steps';
import { STORAGE_KEYS } from '@/lib/constants';

export default function StepThree() {
    const t = useTranslations('thirdStep');
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();

    const handleSelect = useCallback(
        (value: string) => {
            setAnswer(STORAGE_KEYS.AGE, value);

            const nextStep = getNextStep(3);
            const output = getStepPath(nextStep);

            router.push(output);
        },
        [router, setAnswer],
    );

    const variants = [
        { label: `18-29 ${t('years')}`, value: '18-29 years' },
        { label: `30-39 ${t('years')}`, value: '30-39 years' },
        { label: `40-49 ${t('years')}`, value: '40-49 years' },
        { label: `50+ ${t('years')}`, value: '50+' },
    ];

    return (
        <div className="flex flex-col items-center w-full px-6">
            <div className="mb-6 text-center">
                <h1 className="mb-6 text-3xl font-semibold font-albert">{t('title')}</h1>
            </div>

            <div className="mb-5 grid w-full max-w-4xl gap-y-3 lg:grid-cols-2 lg:gap-x-3">
                {variants.map((variant) => (
                    <Card
                        key={variant.value}
                        label={variant.label}
                        selected={answers[STORAGE_KEYS.AGE] === variant.value}
                        onSelect={() => handleSelect(variant.value)}
                    />
                ))}
            </div>
        </div>
    );
}
