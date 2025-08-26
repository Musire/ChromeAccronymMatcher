import { twMerge } from "tailwind-merge";
import { useDrawer } from "@/hooks";
import { Button } from ".";
import clsx from "clsx";
import { Check } from "lucide-react";

const DropdownButton = ({
  Icon,
  buttonStyle,
  drawerStyle,
  options = [],
  state,       // external state value
  setState,    // external setter
  multiple = false
}) => {
  const { isMounted, animation, closeDrawer, toggleDrawer } = useDrawer();

  const handleSelect = (option) => {
    if (multiple) {
      const currentArray = Array.isArray(state) ? [...state] : [];
      const alreadySelected = currentArray.includes(option);
      const updated = alreadySelected
        ? currentArray.filter((v) => v !== option)
        : [...currentArray, option];
      setState(updated);
    } else {
      setState(option);
      closeDrawer();
    }
  };

  const displayText = multiple
    ? (Array.isArray(state) ? state.join(", ") : "")
    : state || "Select";

  return (
    <div className="relative text-else">
      <Button
        action={toggleDrawer}
        className={twMerge(
          "surface-1 snappy hover:surface-3 spaced gap-x-2 text-sm capitalize",
          buttonStyle
        )}
      >
        {displayText}
        {Icon && <Icon size={25} />}
      </Button>

      {isMounted && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDrawer} />

          <aside
            className={twMerge(
              clsx(
                "absolute surface-1 min-w-40 w-full border border-adjust z-20 max-h-40 overflow-y-auto scrollbar-none",
                animation ? "animate-ghostIn" : "animate-ghostOut",
              ),
              drawerStyle
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col w-full p-1">
              {options.map((option) => {
                const isSelected = multiple
                  ? Array.isArray(state) && state.includes(option)
                  : state === option;

                return (
                  <li key={option}>
                    <Button
                      action={() => handleSelect(option)}
                      className="flex items-center w-full text-sm text-left capitalize px-3 py-1 hover:surface-2 easy-transition gap-x-2"
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

export default DropdownButton;
