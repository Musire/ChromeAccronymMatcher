import React from "react";
import { Toast } from ".";

const ToastContainer = ({ toasts }) => {
  return (
    <div className="z-[100] fixed flex flex-col-reverse max-h-full gap-3 overflow-y-auto w-80 bottom-4 left-4">
      {toasts.map((toast) =>  <Toast key={toast.id} data={toast} /> )}
    </div>
  );
};

export default ToastContainer;
