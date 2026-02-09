'use client';

import type { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    customClass?: string;
    disabled?: boolean;
};

const Button = ({
    children,
    onClick,
    customClass,
    disabled = false,
}: ButtonProps) => {
    const baseClasses =
        'w-full md:w-auto md:px-12 text-center py-4 rounded-3xl hover:cursor-pointer font-albert font-bold';
    const stateClasses = disabled
        ? 'bg-[#6E0D58] text-gray-400 cursor-not-allowed'
        : 'bg-[#E4229C]';

    const className = [baseClasses, stateClasses, customClass]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
