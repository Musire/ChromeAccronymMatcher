import { SquarePen, Trash2 } from "lucide-react";

const HoverCard = () => {
    return ( 
        <li className="">
            <article className="w-full h-12 pl-4 bg-surface hover:bg-surface-hover shrink-0 group flex items-center ring-[1px] duration-300 ease-in-out ring-dark/80 hover:ring-primary-variant/70 ">
                <p className="text-xl capitalize">kitchen</p>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto w-16 flex gap-x-2 ">
                    <SquarePen className=" text-smoke easy-transition hover:text-whitesmoke" />
                    <Trash2 className="text-smoke easy-transition hover:text-whitesmoke" />
                </span>
            </article>
        </li>
     );
}
 
export default HoverCard;