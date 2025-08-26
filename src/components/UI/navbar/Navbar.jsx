import { Link } from "react-router-dom";
import { useDrawer } from "@/hooks";

const Navbar = () => {

    return ( 
        <nav className="spaced px-4 surface-1 border-b border-adjust w-full sticky top-0 left-0 z-50 h-[12dvh] py-4">
            <Link to="/" className="text-xl snappy flex items-center space-x-2" >
                <img src="/assets/Main Logo.jpg" alt="" className="size-14" />
                <p className="">Muebles Modernos Miranda’s</p>
            </Link>
        </nav>
     );
}
 
export default Navbar;