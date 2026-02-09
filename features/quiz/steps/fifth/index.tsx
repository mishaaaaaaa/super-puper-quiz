import { getTranslations } from 'next-intl/server';
import { QUIZ_TOPICS, USERS_AGE } from '@/lib/constants';
import { StepFiveOptions } from './options';

export default async function StepFive() {
    const t = await getTranslations('fifthStep');
    const tBtn = await getTranslations('btn');

    const variants = [
        { value: QUIZ_TOPICS.WEREWOLF, label: t('werewolf'), emoji: '🐺' },
        { value: QUIZ_TOPICS.ACTION, label: t('action'), emoji: '💃' },
        { value: QUIZ_TOPICS.ROYAL_OBSESSION, label: t('royalObsession'), emoji: '👑' },
        { value: QUIZ_TOPICS.BILLIONAIRE, label: t('billionaire'), emoji: '🤑' },
        { value: QUIZ_TOPICS.ROMANCE, label: t('romance'), emoji: '🥰' },
        { value: QUIZ_TOPICS.YOUNG_ADULT, label: t('youngAdult'), emoji: '💁‍♀️' },
        { value: QUIZ_TOPICS.BAD_BOY, label: t('badBoy'), emoji: '🤠' },
        { value: QUIZ_TOPICS.VAMPIRE, label: t('vampire'), emoji: '🧛' },
        { value: QUIZ_TOPICS.DRAGON, label: t('dragon'), emoji: '🐉' },
        { value: QUIZ_TOPICS.DARK_ROMANCE, label: t('darkRomance'), emoji: '🖤' },
        { value: QUIZ_TOPICS.ENEMIES_TO_LOVERS, label: t('enemiesToLovers'), emoji: '😠' },
        { value: QUIZ_TOPICS.SECOND_CHANCE, label: t('secondChance'), emoji: '🔄' },
        { value: QUIZ_TOPICS.DETECTIVE, label: t('detective'), emoji: '🕵️‍♀️' },
    ];

    const TOPICS_BY_AGE: Record<string, string[]> = {
        [USERS_AGE.JUNIOR]: [
            QUIZ_TOPICS.YOUNG_ADULT,
            QUIZ_TOPICS.BAD_BOY,
            QUIZ_TOPICS.ROMANCE,
            QUIZ_TOPICS.WEREWOLF,
            QUIZ_TOPICS.VAMPIRE,
            QUIZ_TOPICS.DRAGON,
            QUIZ_TOPICS.BILLIONAIRE,
        ],
        [USERS_AGE.MIDDLE]: [
            QUIZ_TOPICS.BILLIONAIRE,
            QUIZ_TOPICS.ROMANCE,
            QUIZ_TOPICS.ACTION,
            QUIZ_TOPICS.ROYAL_OBSESSION,
            QUIZ_TOPICS.DARK_ROMANCE,
            QUIZ_TOPICS.ENEMIES_TO_LOVERS,
            QUIZ_TOPICS.DETECTIVE,
        ],
        [USERS_AGE.SENIOR]: [
            QUIZ_TOPICS.ROYAL_OBSESSION,
            QUIZ_TOPICS.ROMANCE,
            QUIZ_TOPICS.BILLIONAIRE,
            QUIZ_TOPICS.SECOND_CHANCE,
            QUIZ_TOPICS.DETECTIVE,
            QUIZ_TOPICS.ACTION,
            QUIZ_TOPICS.ENEMIES_TO_LOVERS,
        ],
        [USERS_AGE.SENIOR_PLUS]: [
            QUIZ_TOPICS.ROYAL_OBSESSION,
            QUIZ_TOPICS.ROMANCE,
            QUIZ_TOPICS.BILLIONAIRE,
            QUIZ_TOPICS.SECOND_CHANCE,
            QUIZ_TOPICS.DETECTIVE,
            QUIZ_TOPICS.ACTION,
            QUIZ_TOPICS.ENEMIES_TO_LOVERS,
        ],
    };

    return (
        <StepFiveOptions
            variants={variants}
            nextLabel={tBtn('nextLabel')}
            topicsByAge={TOPICS_BY_AGE}
        >
            <div className="mb-2 text-center px-4 shrink-0">
                <h1 className="mb-2 text-2xl font-semibold font-nunito">{t('title')}</h1>
                <div className="mb-4 text-zinc-400 text-sm font-nunito">{t('subtitle')}</div>
            </div>
        </StepFiveOptions>
    );
}
