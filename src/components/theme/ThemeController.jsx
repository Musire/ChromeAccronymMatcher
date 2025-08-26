import { useThemeContext } from "@/context";
import clsx from "clsx";
import { MonitorSmartphone, MoonStar, Sun } from "lucide-react";
import { twMerge } from "tailwind-merge";

const ThemeController = ({ className }) => {
    const { theme, setTheme } = useThemeContext()
    const boxStyle = "rounded-full size-10 centered snappy  "
    return ( 
        <ul className={twMerge('flex gap-x-4', className)}>
            <li className="">
                <button 
                    onClick={() => setTheme('system')} 
                    type="button" 
                    className={clsx(boxStyle, 
                        theme === 'system'
                        ? 'surface-1 text-emphasis'
                        : 'hover:surface-2 hover:text-else text-disabled'
                     )}>
                    <MonitorSmartphone />
                </button>
            </li>
            <li className="">
                <button 
                    onClick={() => setTheme('light')} 
                    type="button" 
                    className={clsx(boxStyle, 
                        theme === 'light'
                        ? 'surface-1 text-emphasis'
                        : 'hover:surface-2 hover:text-else text-disabled'
                     )}>
                    <Sun />
                </button>
            </li>
            <li className="">
                <button 
                    onClick={() => setTheme('dark')} 
                    type="button" 
                    className={clsx(boxStyle, 
                        theme === 'dark'
                        ? 'surface-1 text-emphasis'
                        : 'hover:surface-2 hover:text-else text-disabled'
                     )}>
                    <MoonStar />
                </button>
            </li>
        </ul>
     );
}
 
export default ThemeController;