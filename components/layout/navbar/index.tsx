'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useRouter } from '@/i18n/routing';
import ProgressBar from '@/components/ui/progress-bar';
import { ArrowBack } from '@/components/ui/icons';
import { getPrevStepPath, TOTAL_QUIZ_STEPS } from '@/lib/quiz-steps';


const QuizNavbar = () => {
    const router = useRouter();
    const params = useParams();

    const step = useMemo(() => {
        const s = params?.step;

        return typeof s === 'string' ? parseInt(s, 10) : 1;
    }, [params?.step]);

    const handleNavBack = () => {
        if (step > 1) {
            router.push(getPrevStepPath(step));
        } else {
            router.back();
        }
    };

    return (
        <div className="mb-6 text-center font-semibold px-6">
            <div className="mb-4 flex items-center justify-between">
                <div
                    onClick={handleNavBack}
                    className="flex h-[24px] w-[24px] items-center justify-center hover:cursor-pointer"
                >
                    {step > 1 && <ArrowBack />}
                </div>

                <div className="text-lg">
                    <span className="self-center text-[#E4229C]">{step}</span>
                    <span className="text-white">/{TOTAL_QUIZ_STEPS}</span>
                </div>

                {/* Placeholder for symmetry or future actions (e.g. close) */}
                <div className="w-[24px]"></div>
            </div>

            <ProgressBar
                progressInfo={{
                    step: step,
                    color: '#E4229C',
                }}
                totalSteps={TOTAL_QUIZ_STEPS}
            />
        </div>
    );
};

export default QuizNavbar;
