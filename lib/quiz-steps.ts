export const TOTAL_QUIZ_STEPS = 5;

export const isValidStep = (step: number) =>
    Number.isInteger(step) && step >= 1 && step <= TOTAL_QUIZ_STEPS;

export const normalizeStep = (step: number) => {
    if (!Number.isFinite(step)) return 1;

    if (step < 1) return 1;

    if (step > TOTAL_QUIZ_STEPS) return TOTAL_QUIZ_STEPS;

    return step;
};

const getNextStep = (step: number) => normalizeStep(step + 1);
const getPrevStep = (step: number) => normalizeStep(step - 1);

export const getStepPath = (step: number) => `/quiz/${step}`;

export const getNextStepPath = (step: number) => getStepPath(getNextStep(step));
export const getPrevStepPath = (step: number) => getStepPath(getPrevStep(step));

