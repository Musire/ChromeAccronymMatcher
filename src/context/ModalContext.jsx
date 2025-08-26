import { useContext, createContext, useState } from "react"

const ModalContext = createContext()

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) throw new Error('no modal context found')
    return context 
}

export const ModalProvider = ({ children }) => {
    const [activeModal, setActive] = useState(null);
    const [modalData, setModalData] = useState(null)

    const closeModal = () => {
        setActive(null)
        setModalData(null)
    }
    const openModal = (id, data = null) => {
        setActive(id)
        if (data !== null) setModalData(data)
        console.log('opened modal:', id, 'with data:', data)
    }

    const modalContext = {
        closeModal,
        activeModal,
        openModal,
        modalData
    }
    return <ModalContext.Provider value={modalContext}>{ children }</ModalContext.Provider>
}

