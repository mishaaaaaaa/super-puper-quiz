"use client";

import { useEffect, useState } from "react";
import Checkbox from "../checkbox";

type CardProps = {
  label: React.ReactNode;
  onSelect: (isChecked?: boolean) => void;
  customClass?: string;
  emoji?: string;
  selected?: boolean;
  withCheckbox?: boolean;
  selectWithDelay?: boolean;
  limit?: number;
  cardList?: unknown[];
};

const Card = ({
  label,
  onSelect,
  customClass,
  emoji,
  selected = false,
  withCheckbox = false,
  selectWithDelay = true,
  limit = 0,
  cardList = [],
}: CardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
    setIsDisabled(false);

    if (selectWithDelay) {
      setTimeout(() => {
        onSelect();
      }, 100);
    } else {
      onSelect();
    }
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  useEffect(() => {
    if (limit > 0) {
      setIsDisabled(cardList.length >= limit && !isSelected);
    }
  }, [cardList, isSelected, limit]);

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsSelected(isChecked);
    onSelect(isChecked);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDisabled) {
      event.stopPropagation();
      handleSelect();
    }
  };

  const className = [
    "bg-[#36173D] rounded-xl p-6 hover:cursor-pointer",
    isSelected && "bg-[#460741] border-2 border-[#E4229C]",
    isDisabled && "bg-[#3d2842] hover:cursor-default",
    withCheckbox && "flex justify-between items-center",
    customClass,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClassName = [emoji && "text-xs"].filter(Boolean).join(" ");

  return (
    <div onClick={handleClick} className={className}>
      {emoji && <div className="text-2xl">{emoji}</div>}
      <span className={labelClassName}>{label}</span>
      {withCheckbox && (
        <Checkbox
          customClass="mb-3"
          selected={isSelected}
          onCheckboxChange={handleCheckboxChange}
        />
      )}
    </div>
  );
};

export default Card;
