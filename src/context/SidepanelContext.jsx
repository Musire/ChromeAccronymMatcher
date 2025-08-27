import { useContext, createContext, useState } from "react"

const SidepanelContext = createContext()

export const useSidepanelContext = () => {
    const context = useContext(SidepanelContext)
    if (!context) throw new Error('no context found')
    return context
}

export const SidepanelProvider = ({ children }) => {
    const [open, setOpen] = useState(true);
    const togglePanel = () => setOpen(prev => !prev)

    const sidepanelContext = {
        open, togglePanel
    }
    return <SidepanelContext.Provider value={sidepanelContext}>{children}</SidepanelContext.Provider>
}