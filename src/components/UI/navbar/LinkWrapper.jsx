import { BriefcaseBusiness, CalendarCheck2, CalendarX2, Goal, LayoutDashboard, Menu, PanelLeftOpen, PanelRightOpen, ShieldUser } from "lucide-react";
import { RedirectLink } from ".";

const icons = {
    'home': LayoutDashboard,
    'employee': ShieldUser,
    'shift': BriefcaseBusiness,
    'visual': Goal,
    'availability': CalendarCheck2,
    'conflicts': CalendarX2
}

const LinkWrapper = ({ links, label, onClick }) => {
    return ( 
        <ul className="w-full pb-4">
            <li className="mb-2 font-semibold capitalize mt-4 text-else  ">{ label }</li>
            { links?.map(l => (
                <RedirectLink 
                    key={`link-to-${l}`}
                    Icon={icons[l]}
                    path={(l === 'home' ? '' : l)}
                    onClick={onClick}
                />
            ))}
        </ul>
     );
}
 
export default LinkWrapper;