import { useState } from "react";
import { Button } from "../buttons";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const Chip = ({ value, isSelected, onClick, chipStyle }) => {
  return (
    <li className="relative">
      {/* The main button */}
      <Button
        className={twMerge(
          clsx(
            "centered capitalize text-base relative", // relative for absolute circle
            isSelected ? "  border border-primary" : "surface-2"
          ),
          chipStyle
        )}
        action={onClick}
      >
        {value}
      </Button>

      {/* Radio circle at top-right */}
      <span
        className={clsx(
          "absolute top-2 right-2  w-4 h-4 rounded-full border-4 border-gray-400 flex items-center justify-center",
          isSelected ? "bg-primary-dark ring-primary ring-2" : "bg-white"
        )}
      >
        {isSelected && <span className="w-2 h-2 rounded-full bg-light" />}
      </span>
    </li>
  );
};

const ChipInput = ({ name, label, options, value: externalValue, onChange: setExternal, defaultValue, chipStyle }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = externalValue !== undefined && typeof setExternal === "function";
  const selectedValue = isControlled ? externalValue : internalValue;

  const handleSelect = (val) => {
    if (isControlled) {
      setExternal(val);
    } else {
      setInternalValue(val);
    }
  };

  return (
    <>
    <legend className="text-lg capitalize">
        {label}
    </legend>
    <ul className="flex space-x-2 capitalize w-full overflow-scroll scrollbar-none">
      {options.map((o) => (
        <Chip
        key={`chip_input_${name}_${o}`}
        value={o}
        isSelected={selectedValue === o}
        onClick={() => handleSelect(o)}
          chipStyle={chipStyle}
        />
      ))}
    </ul>
    </>
  );
};

export default ChipInput;
