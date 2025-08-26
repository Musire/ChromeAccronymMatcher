import { DropdownButton } from "../buttons";
import { ChevronDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Sorting = ({ extendedSytling, buttonStyle, totalCount, sortOption, setSortOption, currentPage, itemsPerPage }) => {
    const start = Math.max((currentPage - 1) * itemsPerPage + 1, 0);
    const end = Math.min(currentPage * itemsPerPage, totalCount);
    const pages = totalCount === 0 ? "no" : `${start}-${end}`
    const {productName} = useParams()
    return ( 
        <div className="h-20"> 
            <span className="spaced">
                <p className="xs:max-md:hidden">{`Showing ${pages} results out of ${totalCount} for "${productName}"`}</p>
                <span className={twMerge('w-full flex justify-end space-x-2 items-center', extendedSytling )} >
                    <p className="" >Sort by</p>
                    <DropdownButton
                        buttonStyle={twMerge('w-48', buttonStyle)}
                        drawerStyle="right-0 top-14"
                        Icon={ChevronDown}
                        options={[
                            'Price: Low to High',
                            'Price: High to Low',
                            'Newest First',
                            'Oldest First'
                        ]}
                        state={sortOption}
                        setState={setSortOption}
                    />
                </span>
            </span>
        </div>
     );
}
 
export default Sorting;