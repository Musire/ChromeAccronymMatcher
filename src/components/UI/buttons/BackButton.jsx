import { ArrowLeft } from "lucide-react";
import { Button } from ".";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(-1)
    }
    return ( 
        <Button action={handleClick} className="flex justify-start w-fit dark:text-white/87  snappy  items-center border-adjust border  space-x-2 surface-2">
            <ArrowLeft className="   " />
            <p className="text-xl">Back</p>
        </Button>
     );
}
 
export default BackButton;