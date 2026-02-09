'use client';

type CheckboxProps = {
    customClass?: string;
    selected: boolean;
    onCheckboxChange: (isChecked: boolean) => void;
};

const Checkbox = ({
    customClass = '',
    selected = false,
    onCheckboxChange = () => { },
}: CheckboxProps) => {
    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        onCheckboxChange(event.target.checked);
    };

    return (
        <div className={customClass} onClick={(event) => event.stopPropagation()}>
            <label className="relative inline-flex cursor-pointer items-center">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={handleCheckboxClick}
                    className="peer sr-only"
                />
                <span
                    className={`
          flex h-[23px] w-[23px] items-center justify-center rounded-[5px] border-2 border-[#E4229B] bg-[#6D4376]
          peer-checked:bg-[#E4229B] peer-checked:border-transparent transition-colors
        `}
                >
                    {selected && (
                        <span className="mb-[2px] h-[12px] w-[6px] rotate-45 border-b-[2px] border-r-[2px] border-white" />
                    )}
                </span>
            </label>
        </div>
    );
};

export default Checkbox;
