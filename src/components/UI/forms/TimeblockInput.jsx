import { generateTimeSlots } from "@/util/time";
import { TimeslotInput } from ".";

const TimeblockInput = () => {
    const hours = generateTimeSlots()
    return ( 
        <div className="h-96 p-4 overflow-y-auto scrollbar-adjust grid grid-cols-[30%_70%] text-center items-center surface-2 space-y-2 " >
            <p className="capitalize">hours</p>
            <p className="capitalize ">required</p>
            {hours.map(h => <TimeslotInput hour={h} />)}
        </div>
     );
}
 
export default TimeblockInput;