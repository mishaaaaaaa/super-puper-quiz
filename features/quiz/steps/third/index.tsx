import { getTranslations } from 'next-intl/server';
import { StepThreeOptions } from './options';

export default async function StepThree() {
    const t = await getTranslations('thirdStep');

    const variants = [
        { label: `18-29 ${t('years')}`, value: '18-29 years' },
        { label: `30-39 ${t('years')}`, value: '30-39 years' },
        { label: `40-49 ${t('years')}`, value: '40-49 years' },
        { label: `50+ ${t('years')}`, value: '50+' },
    ];

    return (
        <div className="flex flex-col items-center w-full px-6">
            <div className="mb-6 text-center">
                <h1 className="mb-6 text-3xl font-semibold font-albert">{t('title')}</h1>
            </div>

            <StepThreeOptions variants={variants} />
        </div>
    );
}
