import { getTranslations } from "@/util/search"
import { useContext, createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid";

const FlowContext = createContext()

export const useFlowContext = () => {
    const context = useContext(FlowContext)
    if (!context) throw new Error('no context found')
    return context
}

export const FlowProvider = ({ children }) => {
    const [panelOne, setPanelOne] = useState(false);
    const [panelTwo, setPanelTwo] = useState(false);
    const [results, setResults] = useState([{id: uuidv4(), en: '', es: ''}]);

    const togglePanelOne = () => setPanelOne(prev => !prev)
    const togglePanelTwo = () => setPanelTwo(prev => !prev)

    const updateTranslation = (target) => {
        let result = getTranslations(target)
        setResults(result)
    }

    const flowContext = {
        panelOne, togglePanelOne,
        panelTwo, togglePanelTwo,
        setPanelTwo,
        updateTranslation,
        results
    }

    return <FlowContext.Provider value={flowContext}>{children}</FlowContext.Provider>
}