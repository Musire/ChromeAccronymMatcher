import clsx from "clsx";
import { Button } from "../UI";
import { useFlowContext } from "@/context";

const ResultController = () => {
    const { panelTwo, togglePanelTwo, results } = useFlowContext()
    
    return ( 
        <div className={clsx('flex flex-col space-y-6 h-[55dvh] text-deep bg-green-200 w-72 fixed right-4 top-[22rem] p-6', { 'animate-ghostIn' : panelTwo, ' animate-ghostOut' : !panelTwo})} 
                    >
            <h3 className="text-xl">Results</h3>
            <div className="w-full grow bg-black/20">
                { results?.map(r => {
                    return (
                        <ul key={r.id} className="p-2 flex flex-col">
                            <li className="font-semibold">{r.en}</li>
                            <li className="italic">{r.es}</li>
                        </ul>
                    )
                    
                })}
            </div>
            <Button action={togglePanelTwo} className="w-full text-deep border border-deep snappy hover:bg-deep hover:text-green-200" >Close</Button>
        </div>
     );
}
 
export default ResultController;