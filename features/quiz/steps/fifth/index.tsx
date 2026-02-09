import { getTranslations } from 'next-intl/server';
import { StepFiveOptions } from './options';

export default async function StepFive() {
    const t = await getTranslations('fifthStep');
    const tBtn = await getTranslations('btn');

    const variants = [
        { value: 'Werewolf', label: t('werewolf'), emoji: '🐺' },
        { value: 'Action', label: t('action'), emoji: '💃' },
        { value: 'Royal Obsession', label: t('royalObsession'), emoji: '👑' },
        { value: 'Billionaire', label: t('billionaire'), emoji: '🤑' },
        { value: 'Romance', label: t('romance'), emoji: '🥰' },
        { value: 'Young Adult', label: t('youngAdult'), emoji: '💁‍♀️' },
        { value: 'Bad Boy', label: t('badBoy'), emoji: '🤠' },
    ];

    return (
        <StepFiveOptions
            variants={variants}
            nextLabel={tBtn('nextLabel')}
        >
            <div className="mb-2 text-center px-4 shrink-0">
                <h1 className="mb-2 text-2xl font-semibold font-nunito">{t('title')}</h1>
                <div className="mb-4 text-zinc-400 text-sm font-nunito">{t('subtitle')}</div>
            </div>
        </StepFiveOptions>
    );
}
