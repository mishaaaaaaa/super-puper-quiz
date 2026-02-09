import { getTranslations } from 'next-intl/server';
import { StepTwoOptions } from './options';

export default async function StepTwo() {
    const t = await getTranslations('secondStep');

    const variants = [
        { label: t('labelFemale'), value: 'Female', emoji: '👩' },
        { label: t('labelMale'), value: 'Male', emoji: '👨' },
        { label: t('labelOther'), value: 'Other', emoji: '😉' },
    ];

    return (
        <div className="flex flex-col items-center px-6">
            <div className="mb-6 text-center">
                <h1 className="mb-2 text-3xl font-semibold font-nunito">{t('title')}</h1>
                <div className="mb-6 text-zinc-400 font-nunito">{t('subtitle')}</div>
            </div>

            <StepTwoOptions variants={variants} />
        </div>
    );
}
