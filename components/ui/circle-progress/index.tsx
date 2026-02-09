'use client';

import { useState, useEffect } from 'react';

type CircularProgressBarProps = {
    sqSize?: number;
    strokeWidth?: number;
    loadingTime?: number;
    customClass?: string;
    afterAction?: () => void;
};

const CircularProgressBar = ({
    sqSize = 250,
    strokeWidth = 12,
    loadingTime = 3000,
    customClass = '',
    afterAction,
}: CircularProgressBarProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        let animationFrame: number;

        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            const percentage = Math.min((elapsedTime / loadingTime) * 100, 100);

            setProgress(percentage);

            if (elapsedTime < loadingTime) {
                animationFrame = requestAnimationFrame(updateProgress);
            } else {
                if (afterAction) {
                    afterAction();
                }
            }
        };

        animationFrame = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(animationFrame);
    }, [loadingTime, afterAction]);

    const radius = (sqSize - strokeWidth) / 2;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * progress) / 100;

    return (
        <svg
            width={sqSize}
            height={sqSize}
            viewBox={`0 0 ${sqSize} ${sqSize}`}
            className={customClass}
        >
            <circle
                className="fill-none stroke-[#E8EAF2] opacity-20"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                className="fill-none stroke-[#E4229C]"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                }}
            />
            <text
                className="text-5xl font-bold fill-white"
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
            >
                {`${Math.round(progress)}%`}
            </text>
        </svg>
    );
};

export default CircularProgressBar;
