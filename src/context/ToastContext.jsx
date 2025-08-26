import React, { createContext, useState, useContext, useCallback } from "react";
import { ToastContainer } from "@/components";

const ToastContext = createContext();

export const useToastContext = () => {
    const context = useContext(ToastContext)
    if (!context) throw new Error('no context in useToast hook')
    
    return context
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 2000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const addSuccess = (msg) => {
    addToast(msg, 'success')
  }

  const addError = (msg) => {
      addToast(msg, 'error')
  }

  return (
    <ToastContext.Provider value={{ addToast, addSuccess, addError }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastProvider