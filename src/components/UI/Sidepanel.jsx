import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Sidepanel = ({ isMounted, drawerStyle, animation, children, onClose }) => {
    if (!isMounted) return null;

    return ( 
        <div
            onClick={onClose}
            className="w-[100dvw] h-[100dvh] fixed inset-0 bg-black/30 backdrop-blur-xs z-50">
            <aside
                className={twMerge(
                clsx(
                    "surface-1 w-[90dvw] pl-4 h-[100dvh] border border-adjust z-10 fixed top-0 right-0 overflow-y-auto scrollbar-none",
                    animation ? "animate-slideIn" : "animate-slideOut"
                ),
                drawerStyle
                )}
                onClick={(e) => e.stopPropagation()} // prevent overlay click
            >
                <ul className="flex flex-col w-full h-full p-2 gap-y-1">
                {children}
                </ul>
            </aside>
        </div>
     );
}
 
export default Sidepanel;