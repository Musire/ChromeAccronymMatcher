import { Button } from "@/components";
import { useModalContext } from "@/context";
import { useDrawer, usePathMatch } from "@/hooks";
import { Plus } from "lucide-react";
import clsx from "clsx";

const MenuButton = () => {
    const { openModal } = useModalContext()
    const { isMounted, animation, toggleDrawer } = useDrawer()
    const isExact = usePathMatch('/admin', { exact: true })
    return ( 
        <>
            <Button 
                action={toggleDrawer} 
                type="button" 
                className={clsx('bg-primary hover:bg-primary-variant easy-transition  rounded-full size-12 text-2xl text-deep', 
                    isExact 
                    ? 'centered' 
                    : 'hidden'
                )}>
                <Plus />
            </Button>
            {isMounted && (
                <aside className={clsx('mobile:w-80 h-40 bg-surface absolute xs:right-4  sm:right-6  md:right-8 xs:bottom-24 md:bottom-0 rounded-xl p-6  ', 
                    animation 
                    ? "animate-ghostIn" 
                    : "animate-ghostOut"
                 )} 
                >
                    <ul className=" w-full h-full text-on-surface ">
                        <li className="w-full">
                            <Button 
                                action={() => openModal('new-employee')} 
                                className='capitalize hover:bg-surface-hover easy-transition text-left w-full'>
                            add employee</Button>
                        </li>
                        <li className="w-full">
                            <Button 
                                action={() => openModal('new-shift')} 
                                className='capitalize hover:bg-surface-hover easy-transition text-left w-full '>
                            add shift</Button>
                        </li>
                        <li className="w-full">
                            <Button 
                                action={() => openModal('new-group')} 
                                className='capitalize hover:bg-surface-hover easy-transition text-left w-full '>
                            add group</Button>
                        </li>
                    </ul>
                </aside>
            )}
        </>
     );
}
 
export default MenuButton;