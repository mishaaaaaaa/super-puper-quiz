'use client';

import { useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Card from '@/components/ui/card';
import { getNextStep, getStepPath } from '@/lib/quiz-steps';
import { STORAGE_KEYS } from '@/lib/constants';

type Variant = {
    label: string;
    value: string;
    emoji: string;
};

type StepTwoOptionsProps = {
    variants: Variant[];
};

export const StepTwoOptions = ({ variants }: StepTwoOptionsProps) => {
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

    return (
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
    );
};
