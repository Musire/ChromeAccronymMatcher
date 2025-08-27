import { useFlowContext } from "@/context"
import { Button } from "../UI"

const InitiationButton = () => {
    const { panelTwo, togglePanelOne, togglePanelTwo } = useFlowContext()
    const initiate = () => {
        if (panelTwo) {
            togglePanelTwo()
        }
        togglePanelOne()
    }
    return ( 
        <Button action={initiate} className="fixed right-4 top-4 bg-sky-200 snappy hover:bg-sky-400 text-deep rounded-full size-14 p-0">Start</Button>
     );
}
 
export default InitiationButton;