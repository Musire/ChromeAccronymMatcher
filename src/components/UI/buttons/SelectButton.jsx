import { useDrawer } from "@/hooks";
import { Button } from ".";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const SelectButton = ({
  initialValue,
  inputStyle,
  buttonStyle,
  drawerStyle,
  options = [],
  externalState,
  externalSetter,
  multiple = false,
  label,
  value,    // Controlled prop (optional)
  onChange, // Controlled callback (optional)
}) => {
  const { isMounted, animation, closeDrawer, toggleDrawer } = useDrawer();

  const isControlled = value !== undefined && typeof onChange === "function";

  const [internalCurrent, setInternalCurrent] = useState(
    multiple
      ? initialValue?.split(",").map((s) => s.trim()) || []
      : initialValue || ""
  );

  const current = isControlled
    ? value
    : externalState !== undefined
    ? externalState
    : internalCurrent;

  const updateMultiple = (val) => {
    const currentArray = Array.isArray(current) ? [...current] : [];
    const alreadySelected = currentArray.includes(val);
    const updated = alreadySelected
      ? currentArray.filter((v) => v !== val)
      : [...currentArray, val];

    if (isControlled) {
      onChange(updated);
    } else if (externalSetter) {
      externalSetter(updated);
    } else {
      setInternalCurrent(updated);
    }
  };

  const updateSingle = (val) => {
    if (isControlled) {
      onChange(val);
    } else if (externalSetter) {
      externalSetter(val);
    } else {
      setInternalCurrent(val);
    }
    toggleDrawer();
  };

  const displayText = multiple
    ? (Array.isArray(current) ? current.join(", ") : "")
    : current;

  const handleOptionClick = (val) => {
    if (multiple) {
      updateMultiple(val);
    } else {
      updateSingle(val);
    }
  };

  return (
    <div className={twMerge("relative flex flex-col text-else min-w-fit w-32 h-fit", inputStyle)}>
      {label && (
        <label className="w-full mb-1 capitalize text-emphasis">{label}</label>
      )}

      <Button
        action={toggleDrawer}
        className={twMerge(
          "w-full surface-1 snappy spaced hover:surface-2 border border-adjust gap-x-2 text-sm capitalize",
          buttonStyle
        )}
      >
        {displayText || "Select"}
        <ChevronDown
          className={clsx("duration-300 ease-in-out", isMounted ? "rotate-180" : "")}
        />
      </Button>

      {isMounted && (
        <>
          {/* Full screen overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => closeDrawer()}
          />

          {/* Dropdown aside */}
          <aside
            className={twMerge(
              clsx(
                "absolute surface-1 min-w-40 w-full border border-adjust z-20 h-28 overflow-y-auto scrollbar-none",
                animation ? "animate-ghostIn" : "animate-ghostOut",
                label ? "top-20" : "top-14",
                // Add left-0 only if drawerStyle doesn't already position it
                !drawerStyle?.match(/(left|right|inset|start|end)-/) && "left-0"
              ),
              drawerStyle
            )}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dropdown
          >
            <ul className="w-full">
              {options.map((option) => {
                const isSelected = multiple
                  ? Array.isArray(current) && current.includes(option)
                  : current === option;

                return (
                  <li key={option}>
                    <Button
                      action={() => handleOptionClick(option)}
                      className="flex items-center w-full text-sm text-left capitalize standard-spacing hover:surface-2 easy-transition gap-x-2"
                    >
                      {multiple && (
                        <span className="w-4">
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </span>
                      )}
                      <span>{option}</span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </>
      )}
    </div>
  );
};

export default SelectButton;
