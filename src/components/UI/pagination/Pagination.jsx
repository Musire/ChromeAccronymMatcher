import { Button } from "../buttons";
import { useEffect } from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const data = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    return ( 
        <div className=" p-4 centered">
            <div className="flex items-center space-x-4">
                <Button 
                    className="surface-1 disabled:bg-transparent disabled:border-transparent snappy hover:surface-3 border border-adjust capitalize active:bg-blue-400/40 disabled:cursor-not-allowed disabled:text-disabled "
                    action={() => setCurrentPage(prev => prev-1)}
                    disabled={currentPage === 1}
                >
                    previous
                </Button>
                <ul className="flex space-x-2">
                    {
                        data?.map(b => {
                            let isActive = currentPage === parseInt(b)
                            return <Button 
                                key={`pagination-button-${b}`}
                                className={` snappy w-14 ${isActive ? "bg-blue-400/40 text-main" : "hover:surface-2 active:bg-blue-400/40 text-else"}`}
                                action={() => setCurrentPage(parseInt(b))}
                            >
                                {b}
                            </Button>
                        })
                    }
                    
                </ul>
                <Button 
                    className="surface-1 disabled:bg-transparent disabled:border-transparent snappy hover:surface-3 border border-adjust capitalize active:bg-blue-400/40 disabled:cursor-not-allowed disabled:text-disabled "
                    disabled={currentPage === totalPages}
                    action={() => setCurrentPage(prev => prev+1)}
                >
                    next
                </Button>
            </div>
        </div>
     );
}
 
export default Pagination;