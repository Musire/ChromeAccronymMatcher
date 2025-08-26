import { Plus } from "lucide-react";
import { Button } from ".";
import { useShouldShowAddButton } from "@/hooks";
import { useModalContext } from "@/context";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const AddButton = ({ className }) => {
    const display = useShouldShowAddButton()
    if (!display) return null;

    const { openModal } = useModalContext()
    const { pathname } = useLocation()

    return ( 
        <Button action={() => openModal(`new-${pathname.split("/").at(-1)}`)} className={twMerge('w-fit capitalize dark:bg-primary-dark dark:hover:bg-primary-dark-hover xs:text-xs  snappy flex items-center space-x-2', className)}>
            <Plus />
            <p className="">{`Add ${pathname?.split("/").at(-1)}`}</p>
        </Button>
     );
}
 
export default AddButton;