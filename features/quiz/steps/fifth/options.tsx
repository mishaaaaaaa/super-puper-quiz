'use client';

import { useEffect } from 'react';
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
    topicsByAge: Record<string, string[]>;
    children: React.ReactNode;
};

export const StepFiveOptions = ({ variants, nextLabel, topicsByAge, children }: StepFiveOptionsProps) => {
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();

    const savedValue = answers[STORAGE_KEYS.FAV_LIST];
    const selectedTopics: string[] = Array.isArray(savedValue)
        ? (savedValue as string[])
        : [];

    // Filter variants based on age
    const age = answers[STORAGE_KEYS.AGE] as string;
    const ageSpecificTopics = topicsByAge[age];

    const visibleVariants = ageSpecificTopics
        ? ageSpecificTopics
            .map((topic) => variants.find((v) => v.value === topic))
            .filter((v): v is Variant => !!v)
        : variants.slice(0, 7);

    // Sync selected topics with visible variants when age changes
    useEffect(() => {
        if (!ageSpecificTopics) return;

        const validTopics = new Set(ageSpecificTopics);
        const filteredSelection = selectedTopics.filter((topic) => validTopics.has(topic));

        if (filteredSelection.length !== selectedTopics.length) {
            setAnswer(STORAGE_KEYS.FAV_LIST, filteredSelection);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [age]);

    const variantColumns = visibleVariants.reduce<Variant[][]>((acc, variant, i) => {
        if (i % 2 === 0) acc.push([]);

        acc[acc.length - 1].push(variant);

        return acc;
    }, []);

    const handleSelect = (value: string) => {
        const prevSelection = Array.isArray(answers[STORAGE_KEYS.FAV_LIST])
            ? (answers[STORAGE_KEYS.FAV_LIST] as string[])
            : [];

        let nextSelection = [...prevSelection];

        if (nextSelection.includes(value)) {
            nextSelection = nextSelection.filter((item) => item !== value);
        } else {
            nextSelection.push(value);
        }

        setAnswer(STORAGE_KEYS.FAV_LIST, nextSelection);
    };

    const handleNext = () => {
        router.push('/analyzing');
    };

    return (
        <div className="flex w-full flex-1 flex-col justify-between overflow-hidden pb-8">
            <div className="flex flex-col items-center overflow-hidden">
                {children}

                {/* Horizontal Scroll Container */}
                <div className="w-full overflow-x-auto pb-4 no-scrollbar touch-pan-x">
                    <div className="flex w-max items-start mx-auto pl-4">
                        {variantColumns.map((columnItems, colIndex) => (
                            <div
                                key={colIndex}
                                className={`flex flex-col gap-4 lg:gap-5 lg:mr-5 ${
                                    // Shift columns 1 and 3 (0-indexed 1, 3, etc.) down
                                    colIndex % 2 !== 0 ? 'mt-12' : 'mt-0'
                                    // eslint-disable-next-line @stylistic/indent
                                    }`}
                            >
                                {columnItems.filter(Boolean).map((variant) => (
                                    <div key={variant.value} className="relative z-10 first:z-20 hover:z-30">
                                        <Card
                                            label={variant.label}
                                            emoji={variant.emoji}
                                            variant="outline"
                                            customClass="!rounded-full w-[100px] h-[100px] shrink-0 flex flex-col items-center justify-center p-2 text-xs bg-[#36173D]"
                                            selected={selectedTopics.includes(variant.value)}
                                            onSelect={() => handleSelect(variant.value)}
                                            limit={3}
                                            cardList={selectedTopics}
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
                    disabled={selectedTopics.length === 0}
                    customClass="!w-full max-w-[320px]"
                >
                    {nextLabel}
                </Button>
            </div>
        </div>
    );
};
