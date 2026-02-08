import type { ReactNode } from 'react';
import { QuizProvider } from '@/context/quiz/quiz-provider';
import QuizNavbar from '@/components/ui/navbar';

export default function QuizLayout({ children }: { children: ReactNode }) {
    return (
        <QuizProvider>
            <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-4">
                <QuizNavbar />
                <main className="mt-8 flex flex-1 flex-col items-center">{children}</main>
            </div>
        </QuizProvider>
    );
}
