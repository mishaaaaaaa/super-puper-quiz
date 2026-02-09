import type { Metadata } from 'next';
import { Niconne, Nunito_Sans, Albert_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { QuizProvider } from '@/context/quiz/quiz-provider';

import '../globals.css';

const nunitoSans = Nunito_Sans({
    variable: '--font-nunito-sans',
    subsets: ['latin'],
});

const niconne = Niconne({
    variable: '--font-niconne',
    subsets: ['latin'],
    weight: '400',
});

const albertSans = Albert_Sans({
    variable: '--font-albert-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Super Puper Quiz',
    description: 'Quiz application',
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={`${niconne.variable} ${nunitoSans.variable} ${albertSans.variable}`}
        >
            <body className="antialiased">
                <NextIntlClientProvider messages={messages}>
                    <QuizProvider>
                        {children}
                    </QuizProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
