import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Drawer = ({ isMounted, drawerStyle, animation, children, onClose }) => { 
  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-10"
      onClick={onClose} // clicking overlay closes drawer
    >
      {/* Transparent or semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Drawer content */}
      <aside
        className={twMerge(
          clsx(
            "surface-1 min-w-40 w-full border border-adjust z-30 min-h-40 overflow-y-auto scrollbar-none ",
            animation ? "animate-ghostIn" : "animate-ghostOut"
          ),
          drawerStyle
        )}
        onClick={(e) => e.stopPropagation()} // prevent overlay click
      >
        <ul className="flex flex-col w-full p-2 gap-y-1">
          {children}
        </ul>
      </aside>
    </div>
  );
};

export default Drawer;
