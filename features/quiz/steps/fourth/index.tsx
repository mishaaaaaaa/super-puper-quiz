import { getTranslations } from 'next-intl/server';
import { StepFourOptions } from './options';

export default async function StepFour() {
    const t = await getTranslations('fourthStep');
    const tBtn = await getTranslations('btn');

    const variants = [
        { label: t('labelLackLogic'), value: 'Lack of logic' },
        { label: t('labelSlowSpeed'), value: 'A slow speed' },
        { label: t('labelLackHumor'), value: 'Lack of humor' },
        { label: t('labelGenericEnding'), value: 'Way too generic ending' },
    ];

    return (
        <StepFourOptions
            variants={variants}
            nextLabel={tBtn('nextLabel')}
        >
            <div className="mb-6 text-center">
                <h1 className="mb-6 text-3xl font-semibold font-albert">
                    {t('titleFirstPart')}{' '}
                    <span className="text-[#EB2F9A]">{t('hate')}</span>{' '}
                    {t('titleSecondPart')}
                </h1>
            </div>
        </StepFourOptions>
    );
}
