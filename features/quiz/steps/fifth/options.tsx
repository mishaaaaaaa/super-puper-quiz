'use client';

import { useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { STORAGE_KEYS } from '@/lib/constants';

type Variant = {
    value: string;
    label: string;
    emoji: string;
};

type StepFiveOptionsProps = {
    variants: Variant[];
    nextLabel: string;
    children: React.ReactNode;
};

export const StepFiveOptions = ({ variants, nextLabel, children }: StepFiveOptionsProps) => {
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();

    const rawValue = answers[STORAGE_KEYS.FAV_LIST];
    const currentAnswers: string[] = Array.isArray(rawValue)
        ? (rawValue as string[])
        : [];

    const handleSelect = useCallback(
        (value: string) => {
            // Get latest state directly
            const currentList = Array.isArray(answers[STORAGE_KEYS.FAV_LIST])
                ? (answers[STORAGE_KEYS.FAV_LIST] as string[])
                : [];

            let newAnswers = [...currentList];

            if (newAnswers.includes(value)) {
                newAnswers = newAnswers.filter((item) => item !== value);
            } else {
                newAnswers.push(value);
            }

            setAnswer(STORAGE_KEYS.FAV_LIST, newAnswers);
        },
        [answers, setAnswer],
    );

    const handleNext = useCallback(() => {
        router.push('/analyzing');
    }, [router]);

    // Explicit column mapping for the specific scroll + honeycomb layout
    const columns = [
        [variants[0], variants[4]], // Col 1: Werewolf, Romance
        [variants[1], variants[5]], // Col 2: Action, Young Adult (Shifted)
        [variants[2], variants[6]], // Col 3: Royal Obsession, Bad Boy
        [variants[3]],               // Col 4: Billionaire (Shifted)
    ];

    return (
        <div className="flex w-full flex-1 flex-col justify-between overflow-hidden pb-8">
            <div className="flex flex-col items-center overflow-hidden">
                {children}

                {/* Horizontal Scroll Container */}
                <div className="w-full overflow-x-auto pb-4 no-scrollbar touch-pan-x">
                    <div className="flex w-max items-start mx-auto pl-4">
                        {columns.map((colItems, colIndex) => (
                            <div
                                key={colIndex}
                                className={`flex flex-col gap-4 lg:gap-5 lg:mr-5 ${
                                    // Shift columns 1 and 3 (0-indexed 1 and 3) down
                                    colIndex % 2 !== 0 ? 'mt-12' : 'mt-0'
                                    // eslint-disable-next-line @stylistic/indent
                                    }`}
                            >
                                {colItems.filter(Boolean).map((variant) => (
                                    <div key={variant.value} className="relative z-10 first:z-20 hover:z-30">
                                        <Card
                                            label={variant.label}
                                            emoji={variant.emoji}
                                            variant="outline"
                                            customClass="!rounded-full w-[100px] h-[100px] shrink-0 flex flex-col items-center justify-center p-2 text-xs bg-[#36173D]"
                                            selected={currentAnswers.includes(variant.value)}
                                            onSelect={() => handleSelect(variant.value)}
                                            limit={3}
                                            cardList={currentAnswers}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
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
