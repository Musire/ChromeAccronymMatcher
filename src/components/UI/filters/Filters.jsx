import { ChevronDown } from "lucide-react";
import { Button, DropdownButton } from "../buttons";

const Filters = ({ filters, setFilters, clearFilters }) => {

    const handleColorChange = (colorValue) => {
        setFilters(prev => ({
        ...prev,
        color: colorValue
        }));
    };

    const handlePriceChange = (e) => {
        let cleaned = e.target.value;
        // Remove everything that is not a digit
        cleaned = cleaned.replace(/[^0-9]/g, "");
        // Remove leading zeros
        cleaned = cleaned.replace(/^0+(?=\d)/, "");
        // Update input value
        e.target.value = cleaned;
        // Optionally return the number for state update
        return cleaned ? Number(cleaned) : undefined;
    };

    return (
        <>
        <div className="surface-1 max-h-96 w-72 p-4 flex-col flex space-y-6 ">
            <DropdownButton
                buttonStyle="w-full surface-2" 
                drawerStyle="top-12"
                options={["white", "black", "grey", "beige", "brown", "navy blue", "oak", "walnut"]}
                state={filters.color || "Color"}
                setState={handleColorChange}
                Icon={ChevronDown}
            />
            <label className="flex flex-col space-y-2 text-sm">
                <span className="">Min Price</span>
                <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) =>
                    setFilters(prev => ({
                    ...prev,
                    minPrice: handlePriceChange(e)
                    }))
                }
                className="border rounded p-2 "
                />
            </label>

            <label className="flex flex-col space-y-2 text-sm">
                <span className="">Max Price</span>
                <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                    setFilters(prev => ({
                    ...prev,
                    maxPrice: handlePriceChange(e)
                }))
            }
            className="border rounded p-2  "
                />
            </label>
            <Button
                action={clearFilters}
                disabled={!Object.keys(filters).length}
                className="normal-space disabled:cursor-not-allowed snappy  disabled:hover:bg-white dark:disabled:hover:bg-red-300/20 text-error dark:text-error-dark dark:border-error-dark border dark:hover:bg-red-400/10 hover:bg-red-200 border-error disabled:surface-disabled w-full mt-auto"
                > 
                clear filters
            </Button>
        </div>
        </>
     );
}
 
export default Filters;