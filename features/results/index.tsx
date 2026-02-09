'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { STORAGE_KEYS, LANG_NAMES } from '@/lib/constants';
import { DownloadIcon } from '@/components/ui/icons';

const CSV_HEADERS = ['Order', 'title', 'type', 'answer'];

export const ResultsScreen = () => {
    const t = useTranslations('finalStep');
    const router = useRouter();
    const { answers, clearAnswers } = useQuiz();

    const handleRetake = () => {
        clearAnswers();
        router.push('/quiz/1');
    };

    const downloadCSV = () => {
        const langCode = (answers[STORAGE_KEYS.I18N_LANGUAGE] || 'en') as keyof typeof LANG_NAMES;

        const formatAnswer = (val: string | string[] | undefined) => {
            if (Array.isArray(val)) return val.join(', ');

            return val || '';
        };

        const rows = [
            {
                order: 1,
                title: 'What is your preferred language?',
                type: 'single-select',
                answer: LANG_NAMES[langCode] || LANG_NAMES.en,
            },
            {
                order: 2,
                title: 'What gender do you identify with?',
                type: 'single-select-image',
                answer: formatAnswer(answers[STORAGE_KEYS.GENDER]),
            },
            {
                order: 3,
                title: 'What is your age?',
                type: 'single-select',
                answer: formatAnswer(answers[STORAGE_KEYS.AGE]),
            },
            {
                order: 4,
                title: 'What do you hate the most in a book?',
                type: 'multiple-select',
                answer: formatAnswer(answers[STORAGE_KEYS.HATE_LIST]),
            },
            {
                order: 5,
                title: 'What are your favorite topics?',
                type: 'bubble',
                answer: formatAnswer(answers[STORAGE_KEYS.FAV_LIST]),
            },
            {
                order: 6,
                title: 'Email',
                type: 'email',
                answer: formatAnswer(answers[STORAGE_KEYS.EMAIL]),
            },
        ];

        const escapeCsv = (str: string | number) => {
            const stringValue = String(str);

            if (
                stringValue.includes(',') ||
                stringValue.includes('"') ||
                stringValue.includes('\n')
            ) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }

            return stringValue;
        };

        const csvContent = [
            CSV_HEADERS.join(','),
            ...rows.map((row) =>
                [
                    row.order,
                    escapeCsv(row.title),
                    escapeCsv(row.type),
                    escapeCsv(row.answer),
                ].join(','),
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute('download', 'answers.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="mx-auto flex h-screen w-full max-w-5xl flex-col overflow-hidden py-4">
            {/* Spacer to match QuizNavbar height and margins */}
            <div className="mb-6 px-6 opacity-0 pointer-events-none sticky top-0">
                <div className="mb-4 flex items-center justify-between">
                    <div className="h-[24px] w-[24px]" />
                    <div className="text-lg">
                        <span>1/5</span>
                    </div>
                    <div className="w-[24px]" />
                </div>
                <div className="h-[6px] w-full" />
            </div>

            <main className="flex flex-1 flex-col items-center justify-between w-full px-6 mt-8">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold mb-4 font-display">
                        {t('title')}
                    </h1>
                    <p className="mb-8 text-[#C4C8CC] font-medium font-nunito">
                        {t('subtitle')}
                    </p>

                    <div className="relative w-36 h-36 mt-4">
                        <Image
                            src="/images/circle_check.png"
                            alt="Success"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="w-full max-w-md mb-8 flex flex-col items-center gap-6">
                    <button
                        onClick={downloadCSV}
                        className="flex items-center gap-2 text-white font-medium hover:text-[#E4229C] transition-colors"
                    >
                        <DownloadIcon />
                        <span>{t('dowloadAnswersBtn')}</span>
                    </button>

                    <Button onClick={handleRetake} customClass="w-full">
                        {t('retakeBtn')}
                    </Button>
                </div>
            </main>
        </div>
    );
};
