'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
} from 'react';
import { STORAGE_KEYS } from '@/lib/constants';

type AnswerValue = string | string[];
type QuizContextType = {
    answers: Record<string, AnswerValue>;
    setAnswer: (key: string, value: AnswerValue) => void;
    clearAnswers: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const loadInitialAnswers = (): Record<string, AnswerValue> => {
    const loaded: Record<string, AnswerValue> = {};

    if (typeof window === 'undefined') return loaded;

    Object.values(STORAGE_KEYS).forEach((key) => {
        const item = localStorage.getItem(key);

        if (!item) return;

        try {
            const parsed = JSON.parse(item);

            loaded[key] =
                Array.isArray(parsed) || typeof parsed === 'string' ? parsed : item;
        } catch {
            loaded[key] = item;
        }
    });

    return loaded;
};

export function QuizProvider({ children }: { children: ReactNode }) {
    const [answers, setAnswers] = useState<Record<string, AnswerValue>>(loadInitialAnswers);

    const setAnswer = useCallback((key: string, value: AnswerValue) => {
        setAnswers((prev) => { return { ...prev, [key]: value }; });

        if (typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, []);

    const clearAnswers = useCallback(() => {
        setAnswers({});
        Object.values(STORAGE_KEYS).forEach((key) => {
            if (key !== STORAGE_KEYS.I18N_LANGUAGE) {
                localStorage.removeItem(key);
            }
        });
    }, []);

    return (
        <QuizContext.Provider value={{ answers, setAnswer, clearAnswers }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);

    if (!context) throw new Error('useQuiz must be used within a QuizProvider');

    return context;
}
