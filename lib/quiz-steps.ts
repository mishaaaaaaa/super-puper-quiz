export const TOTAL_QUIZ_STEPS = 5;

export const QUIZ_STEP_IDS = Array.from(
    { length: TOTAL_QUIZ_STEPS },
    (_, index) => index + 1,
);

export const isValidStep = (step: number) =>
    Number.isInteger(step) && step >= 1 && step <= TOTAL_QUIZ_STEPS;

export const normalizeStep = (step: number) => {
    if (!Number.isFinite(step)) return 1;

    if (step < 1) return 1;

    if (step > TOTAL_QUIZ_STEPS) return TOTAL_QUIZ_STEPS;

    return step;
};

export const getNextStep = (step: number) => normalizeStep(step + 1);
export const getPrevStep = (step: number) => normalizeStep(step - 1);

export const getStepPath = (step: number) => `/quiz/${step}`;
