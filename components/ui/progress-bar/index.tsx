'use client';

import { useEffect, useState } from 'react';

type ProgressInfo = {
    step: number;
    color: string;
};

type ProgressBarProps = {
    label?: string;
    backgroundColor?: string;
    progressInfo?: ProgressInfo;
    totalSteps?: number;
};

const ProgressBar = ({
    label,
    backgroundColor = '#e5e5e5',
    progressInfo = {
        step: 1,
        color: 'white',
    },
    totalSteps = 5,
}: ProgressBarProps) => {
    const [width, setWidth] = useState('0%');

    const convertStepToProgress = (step: number) =>
        `${(step / totalSteps) * 100}%`;

    useEffect(() => {
        requestAnimationFrame(() => {
            setWidth(convertStepToProgress(progressInfo.step));
        });
    }, [progressInfo.step, totalSteps]);

    return (
        <>
            {label ? (
                <div className="font-sans text-sm text-white/80">{label}</div>
            ) : null}
            <div className="flex h-[6px] rounded-[5px]" style={{ backgroundColor }}>
                <div
                    className="rounded-[5px] transition-[width] duration-1000"
                    style={{ width, backgroundColor: progressInfo.color }}
                />
            </div>
        </>
    );
};

export default ProgressBar;
