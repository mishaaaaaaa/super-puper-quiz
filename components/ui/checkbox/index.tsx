"use client";

type CheckboxProps = {
  customClass?: string;
  selected: boolean;
  onCheckboxChange: (isChecked: boolean) => void;
};

const Checkbox = ({
  customClass = "",
  selected = false,
  onCheckboxChange = () => {},
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
        <span className="flex h-[21px] w-[21px] items-center justify-center rounded-[5px] border-2 border-[#E4229B] bg-[#6D4376] peer-checked:border-transparent peer-checked:bg-[#E4229B]">
          <span className="hidden h-[10px] w-[5px] -translate-y-[1px] rotate-45 border-r-[3px] border-b-[3px] border-white peer-checked:block" />
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
