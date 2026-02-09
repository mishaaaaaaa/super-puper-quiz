'use client';

import type { ChangeEventHandler } from 'react';

type InputProps = {
    value: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    isValid: boolean;
    placeholder?: string;
    customClass?: string;
    errorMessage?: string;
    id?: string;
    name?: string;
};

const Input = ({
    value,
    handleChange,
    isValid,
    placeholder,
    customClass,
    errorMessage = 'Invalid field',
    id,
    name,
}: InputProps) => {
    const className = [
        'bg-[#36173D] text-white rounded-lg py-4 px-4 w-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-300 ease-in-out',
        !isValid && '!border-red-700',
        customClass,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={className}
            />
            {!isValid && (
                <span className="absolute top-full left-0 mt-2 text-sm text-red-500">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export default Input;
