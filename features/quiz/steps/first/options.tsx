'use client';

import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Card from '@/components/ui/card';
import { getNextStepPath } from '@/lib/quiz-steps';
import { STORAGE_KEYS } from '@/lib/constants';

type Variant = {
    label: string;
    code: string;
};

type FirstStepOptionsProps = {
    variants: Variant[];
};

export const FirstStepOptions = ({ variants }: FirstStepOptionsProps) => {
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();

    const handleSelect = (langCode: string) => {
        setAnswer(STORAGE_KEYS.I18N_LANGUAGE, langCode);

        router.push(getNextStepPath(1), { locale: langCode });
    };

    return (
        <div className="mb-5 grid w-full max-w-4xl gap-y-3 lg:grid-cols-2 lg:gap-x-3">
            {variants.map((variant) => (
                <Card
                    key={variant.code}
                    label={variant.label}
                    selected={answers[STORAGE_KEYS.I18N_LANGUAGE] === variant.code}
                    onSelect={() => handleSelect(variant.code)}
                    customClass="items-start pl-5"
                />
            ))}
        </div>
    );
};
