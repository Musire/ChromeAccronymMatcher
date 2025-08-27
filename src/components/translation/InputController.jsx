import { useFlowContext } from "@/context";
import clsx from "clsx";
import { Button } from "../UI";
import { useEffect, useRef } from "react";

const InputController = () => {
    const {panelOne, setPanelTwo, updateTranslation } = useFlowContext()
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef?.current?.value === "") return;
        setPanelTwo(true)
        updateTranslation(inputRef.current.value);
    };

    useEffect(() => {
        if (panelOne && inputRef.current) {
        inputRef.current.focus();
        }
    }, [panelOne]);

    return ( 
        <div className={clsx('flex h-fit flex-col text-deep bg-softOrange w-72 fixed right-4 top-24 p-6 space-y-6', { 'animate-ghostIn' : panelOne, ' animate-ghostOut' : !panelOne})} >
            <h3 className="text-xl">Input</h3>
            <label htmlFor="" className="flex flex-col space-y-2">
                <span className="">Accronym</span>
                <input 
                    ref={inputRef}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} 
                    type="text" 
                    className="bg-white text-deep outline-0 active:outline-0 px-2 py-1 border border-deep/30" />
            </label>
            <Button 
                type="submit" 
                action={e => handleSubmit(e)} 
                className="w-full text-deep border border-deep snappy hover:bg-deep hover:text-softOrange" 
            >
                Submit
            </Button>
        </div>
     );
}
 
export default InputController;