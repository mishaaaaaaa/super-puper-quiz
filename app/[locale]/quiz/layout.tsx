import type { ReactNode } from 'react';
import QuizNavbar from '@/components/layout/navbar';

export default function QuizLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex h-screen w-full max-w-5xl flex-col overflow-hidden py-4">
            <QuizNavbar />
            <main className="mt-8 flex flex-1 flex-col items-center">{children}</main>
        </div>
    );
}
