import { redirect } from "next/navigation";

import { getStepPath, isValidStep, normalizeStep } from "@/lib/quiz-steps";
import StepOne from "@/features/quiz/steps/first";

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

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Step {stepNumber}</h2>
      <p className="text-gray-500">Not implemented yet</p>
    </div>
  );
}
