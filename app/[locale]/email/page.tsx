'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from '@/i18n/routing';
import { useQuiz } from '@/context/quiz/quiz-provider';
import { validateEmail } from '@/lib/utils';
import { STORAGE_KEYS, LINKS } from '@/lib/constants';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function EmailPage() {
    const t = useTranslations('emailSubmit');
    const tBtn = useTranslations('btn');
    const router = useRouter();
    const { setAnswer, answers } = useQuiz();
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    useEffect(() => {
        const savedEmail = answers[STORAGE_KEYS.EMAIL] as string;

        if (savedEmail && !email) {
            setEmail(savedEmail);
            setIsValidEmail(validateEmail(savedEmail));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (email) {
                setIsValidEmail(validateEmail(email));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setEmail(value);
        if (!isValidEmail) {
            setIsValidEmail(true);
        }
    };

    const handleSubmit = () => {
        if (!validateEmail(email)) {
            setIsValidEmail(false);

            return;
        }

        setAnswer(STORAGE_KEYS.EMAIL, email);
        router.push('/results');
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
                <div className="w-full max-w-md">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4 font-nunito">
                            {t('title')}
                        </h1>
                        <p className="mb-8 text-[#C4C8CC] font-medium font-nunito">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="w-full space-y-8">
                        <Input
                            id="email"
                            name="email"
                            value={email}
                            handleChange={handleChange}
                            isValid={isValidEmail}
                            placeholder={t('emailPlaceholder')}
                            errorMessage={t('invalidEmail')}
                        />

                        <div className="text-center text-xs md:text-sm font-medium leading-5">
                            <span className="text-[#6C757D]">{t('policyAndTerms')}</span>{' '}
                            <Link
                                href={LINKS.PRIVACY}
                                target="_blank"
                                className="text-[#E4229C] hover:text-[#D11185] transition-colors"
                            >
                                {t('privacyPolicy')}
                            </Link>{' '}
                            <span className="text-[#6C757D]">{t('and')}</span>{' '}
                            <Link
                                href={LINKS.TERMS}
                                target="_blank"
                                className="text-[#E4229C] hover:text-[#D11185] transition-colors"
                            >
                                {t('terms')}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md mb-8">
                    <Button
                        disabled={!isValidEmail || !email}
                        onClick={handleSubmit}
                        customClass="w-full"
                    >
                        {tBtn('nextLabel')}
                    </Button>
                </div>
            </main>
        </div>
    );
}
