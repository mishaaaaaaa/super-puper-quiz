import { redirect } from 'next/navigation';

import { getStepPath, isValidStep, normalizeStep } from '@/lib/quiz-steps';
import StepOne from '@/features/quiz/steps/first';
import StepTwo from '@/features/quiz/steps/second';
import StepThree from '@/features/quiz/steps/third';
import StepFour from '@/features/quiz/steps/fourth';
import StepFive from '@/features/quiz/steps/fifth';

export default async function QuizStepPage({
    params,
}: {
    params: Promise<{ step: string }>;
}) {
    const { step } = await params;
    const stepNumber = Number(step);

    if (!isValidStep(stepNumber)) {
        const safeStep = normalizeStep(stepNumber);

        redirect(getStepPath(safeStep));
    }

    if (stepNumber === 1) {
        return <StepOne />;
    }

    if (stepNumber === 2) {
        return <StepTwo />;
    }

    if (stepNumber === 3) {
        return <StepThree />;
    }

    if (stepNumber === 4) {
        return <StepFour />;
    }

    if (stepNumber === 5) {
        return <StepFive />;
    }

    return (
        <div className="p-8 text-center">
            <h2 className="text-2xl font-bold">Step {stepNumber}</h2>
            <p className="text-gray-500">Not implemented yet</p>
        </div>
    );
}
