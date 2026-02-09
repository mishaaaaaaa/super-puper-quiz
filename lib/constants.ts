export const STORAGE_KEYS = {
    I18N_LANGUAGE: 'I18N_LANGUAGE',
    GENDER: 'GENDER',
    AGE: 'AGE',
    HATE_LIST: 'HATE_LIST',
    FAV_LIST: 'FAV_LIST',
    EMAIL: 'EMAIL',
} as const;

export const LANG_NAMES = {
    en: 'English',
    de: 'German',
    es: 'Spanish',
    fr: 'French',
} as const;

export const SELECT_TYPES = {
    SINGLE: 'single-select',
    SINGLE_WITH_IMAGE: 'single-select-image',
    MULTI: 'multiple-select',
    BUBBLE: 'buble',
    EMAIL: 'email',
} as const;

export const USERS_AGE = {
    JUNIOR: '18-29 years',
    MIDDLE: '30-39 years',
    SENIOR: '40-49 years',
    SENIOR_PLUS: '50+',
};

export const QUIZ_TOPICS = {
    WEREWOLF: 'Werewolf',
    ACTION: 'Action',
    ROYAL_OBSESSION: 'Royal Obsession',
    BILLIONAIRE: 'Billionaire',
    ROMANCE: 'Romance',
    YOUNG_ADULT: 'Young Adult',
    BAD_BOY: 'Bad Boy',
    VAMPIRE: 'Vampire',
    DRAGON: 'Dragon',
    DARK_ROMANCE: 'Dark Romance',
    ENEMIES_TO_LOVERS: 'Enemies to Lovers',
    SECOND_CHANCE: 'Second Chance',
    DETECTIVE: 'Detective',
} as const;

export const TOTAL_QUIZ_STEPS = 5;

export const LINKS = {
    PRIVACY: 'https://www.youtube.com/watch?v=T_FQH49fMTA&list=RDT_FQH49fMTA&start_radio=1',
    TERMS: 'https://www.forbes.com/sites/charliefink/2026/01/16/holywater-raises-additional-22-million-to-expand-ai-vertical-video-platform/',
} as const;
