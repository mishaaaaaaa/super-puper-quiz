import { LANG_NAMES } from '@/lib/constants';
import { FirstStepOptions } from './options';

export default function StepOne() {
    const variants = [
        { label: LANG_NAMES.en, code: 'en' },
        { label: LANG_NAMES.fr, code: 'fr' },
        { label: LANG_NAMES.de, code: 'de' },
        { label: LANG_NAMES.es, code: 'es' },
    ];

    return (
        <div className="flex flex-col items-center w-full px-6">
            <div className="mb-6 text-center">
                <h1 className="mb-6 text-3xl font-semibold font-nunito">
                    What is your preferred language?
                </h1>
                <div className="mb-6 text-zinc-400 font-nunito">Choose language</div>
            </div>

            <FirstStepOptions variants={variants} />
        </div>
    );
}
