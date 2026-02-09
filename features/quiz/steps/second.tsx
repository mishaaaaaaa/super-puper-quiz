'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Card from '@/components/ui/card';
import { getNextStep, getStepPath } from '@/lib/quiz-steps';
import { STORAGE_KEYS } from '@/lib/constants';

export default function StepTwo() {
    const t = useTranslations('secondStep');
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();

    const handleSelect = useCallback(
        (value: string) => {
            setAnswer(STORAGE_KEYS.GENDER, value);

            const nextStep = getNextStep(2);
            const output = getStepPath(nextStep);

            router.push(output);
        },
        [router, setAnswer],
    );

    const variants = [
        { label: t('labelFemale'), value: 'Female', emoji: '👩' },
        { label: t('labelMale'), value: 'Male', emoji: '👨' },
        { label: t('labelOther'), value: 'Other', emoji: '😉' },
    ];

    return (
        <div className="flex flex-col items-center px-6">
            <div className="mb-6 text-center">
                <h1 className="mb-2 text-3xl font-semibold font-nunito">{t('title')}</h1>
                <div className="mb-6 text-zinc-400 font-nunito">{t('subtitle')}</div>
            </div>

            <div className="mb-5 grid w-full max-w-4xl gap-y-3 lg:grid-cols-3 lg:gap-x-3">
                {variants.map((variant) => (
                    <Card
                        key={variant.value}
                        label={variant.label}
                        emoji={variant.emoji}
                        selected={answers[STORAGE_KEYS.GENDER] === variant.value}
                        onSelect={() => handleSelect(variant.value)}
                    />
                ))}
            </div>
        </div>
    );
}
