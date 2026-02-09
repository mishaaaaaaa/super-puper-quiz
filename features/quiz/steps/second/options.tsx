'use client';

import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Card from '@/components/ui/card';
import { getNextStepPath } from '@/lib/quiz-steps';
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

    const handleSelect = (value: string) => {
        setAnswer(STORAGE_KEYS.GENDER, value);

        router.push(getNextStepPath(2));
    };

    return (
        <div className="mb-5 grid w-full max-w-4xl grid-cols-3 gap-3">
            {variants.map((variant) => (
                <Card
                    key={variant.value}
                    label={variant.label}
                    emoji={variant.emoji}
                    selected={answers[STORAGE_KEYS.GENDER] === variant.value}
                    onSelect={() => handleSelect(variant.value)}
                    customClass="h-36"
                />
            ))}
        </div>
    );
};
