import clsx from "clsx";
import { NavLink } from "react-router-dom";

const RedirectLink = ({ path, Icon, onClick }) => {
    const linkStyle = "py-1 px-2 rounded-lg capitalize snappy h-14 w-full flex  "
    const activeStyle = "dark:bg-primary-dark bg-black/60 text-whitesmoke"
    const inActiveStyle = " dark:hover:text-silver text-disabled hover:bg-black/50 dark:hover:surface-2"

    
    return ( 
        <li key={`link-to-${path}`} className="@max-[8dvw]:w-14 ">
                <NavLink
                    to={path}
                    end
                    onClick={onClick} // 👈 this closes the drawer on click
                    className={({ isActive }) =>
                        clsx(
                            linkStyle,
                            isActive ? activeStyle : inActiveStyle,
                            "items-center flex gap-x-2 " // move button styles here
                        )
                    }
                >
                    <Icon className="size-6 shrink-0 @max-[8dvw]:size-7 @max-[8dvw]:ml-[.4rem]  snappy" />
                    <p className="@max-[8dvw]:animate-fadeOut animate-fadeIn snappy">{path === '' ? 'home' : path}</p>
                </NavLink>
            </li>
     );
}
 
export default RedirectLink;