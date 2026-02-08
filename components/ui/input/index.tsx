"use client";

import type { ChangeEventHandler } from "react";

type InputProps = {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isValid: boolean;
  placeholder?: string;
  customClass?: string;
  errorMessage?: string;
};

const Input = ({
  value,
  handleChange,
  isValid,
  placeholder,
  customClass,
  errorMessage = "Invalid field",
}: InputProps) => {
  const className = [
    "bg-[#36173D] text-white rounded-lg py-4 px-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out",
    !isValid && "border-2 border-red-700",
    customClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={className}
      />
      {!isValid && (
        <span className="absolute top-full left-0 text-sm text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;
