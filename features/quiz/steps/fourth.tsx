'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { useRouter } from '@/i18n/routing';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { STORAGE_KEYS } from '@/lib/constants';
import { useQuiz } from '@/context/quiz/quiz-provider';
import { getNextStep, getStepPath } from '@/lib/quiz-steps';

export default function StepFour() {
    const t = useTranslations('fourthStep');
    const tBtn = useTranslations('btn');
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();

    const rawValue = answers[STORAGE_KEYS.HATE_LIST];
    const currentAnswers: string[] = Array.isArray(rawValue)
        ? (rawValue as string[])
        : [];

    const handleSelect = useCallback(
        (value: string) => {
            // Get latest state directly
            const currentList = Array.isArray(answers[STORAGE_KEYS.HATE_LIST])
                ? (answers[STORAGE_KEYS.HATE_LIST] as string[])
                : [];

            let newAnswers = [...currentList];

            if (newAnswers.includes(value)) {
                newAnswers = newAnswers.filter((item) => item !== value);
            } else {
                newAnswers.push(value);
            }

            setAnswer(STORAGE_KEYS.HATE_LIST, newAnswers);
        },
        [answers, setAnswer],
    );

    const handleNext = useCallback(() => {
        const nextStep = getNextStep(4);
        const output = getStepPath(nextStep);

        router.push(output);
    }, [router]);

    const variants = [
        { label: t('labelLackLogic'), value: 'Lack of logic' },
        { label: t('labelSlowSpeed'), value: 'A slow speed' },
        { label: t('labelLackHumor'), value: 'Lack of humor' },
        { label: t('labelGenericEnding'), value: 'Way too generic ending' },
    ];

    return (
        <div className="flex h-full flex-col justify-between pb-8">
            <div className="flex flex-col items-center">
                <div className="mb-6 text-center">
                    <h1 className="mb-6 text-3xl font-semibold font-albert">
                        {t('titleFirstPart')}{' '}
                        <span className="text-[#EB2F9A]">{t('hate')}</span>{' '}
                        {t('titleSecondPart')}
                    </h1>
                </div>

                <div className="mb-5 grid w-full max-w-4xl gap-y-3 lg:grid-cols-2 lg:gap-x-3">
                    {variants.map((variant) => (
                        <Card
                            key={variant.value}
                            label={variant.label}
                            withCheckbox
                            selectWithDelay={false}
                            selected={currentAnswers.includes(variant.value)}
                            onSelect={() => handleSelect(variant.value)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center px-4 shrink-0">
                <Button
                    onClick={handleNext}
                    disabled={currentAnswers.length === 0}
                    customClass="!w-full max-w-[320px]"
                >
                    {tBtn('nextLabel')}
                </Button>
            </div>
        </div>
    );
}
