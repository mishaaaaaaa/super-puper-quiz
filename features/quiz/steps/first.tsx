'use client';

import { useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import Card from '@/components/ui/card';
import { LANG_NAMES, STORAGE_KEYS } from '@/lib/constants';
import { useQuiz } from '@/context/quiz/quiz-provider';
import { getNextStep, getStepPath } from '@/lib/quiz-steps';

export default function StepOne() {
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();

    const handleSelect = useCallback(
        (langCode: string) => {
            setAnswer(STORAGE_KEYS.I18N_LANGUAGE, langCode);

            const nextStep = getNextStep(1);
            const output = getStepPath(nextStep);

            // Switch locale and move to next step
            router.push(output, { locale: langCode });
        },
        [router, setAnswer],
    );

    const variants = [
        { label: LANG_NAMES.en, code: 'en' },
        { label: LANG_NAMES.fr, code: 'fr' },
        { label: LANG_NAMES.de, code: 'de' },
        { label: LANG_NAMES.es, code: 'es' },
    ];

    return (
        <div className="flex flex-col items-center">
            <div className="mb-6 text-center">
                <h1 className="mb-6 text-3xl font-semibold">
                    What is your preferred language?
                </h1>
                <div className="mb-6 text-zinc-400">Choose language</div>
            </div>

            <div className="mb-5 grid w-full max-w-4xl gap-y-3 lg:grid-cols-2 lg:gap-x-3">
                {variants.map((variant) => (
                    <Card
                        key={variant.code}
                        label={variant.label}
                        selected={answers[STORAGE_KEYS.I18N_LANGUAGE] === variant.code}
                        onSelect={() => handleSelect(variant.code)}
                    />
                ))}
            </div>
        </div>
    );
}
