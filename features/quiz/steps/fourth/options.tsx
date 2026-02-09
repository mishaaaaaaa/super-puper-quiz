'use client';

import { useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { getNextStep, getStepPath } from '@/lib/quiz-steps';
import { STORAGE_KEYS } from '@/lib/constants';

type Variant = {
    label: string;
    value: string;
};

type StepFourOptionsProps = {
    variants: Variant[];
    nextLabel: string;
    children: React.ReactNode;
};

export const StepFourOptions = ({ variants, nextLabel, children }: StepFourOptionsProps) => {
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

    return (
        <div className="flex h-full flex-col justify-between pb-8 px-6">
            <div className="flex flex-col items-center">
                {children}

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
                    {nextLabel}
                </Button>
            </div>
        </div>
    );
};
