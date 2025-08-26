import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Button } from '.';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalTitle = title ? title : 'modal title'

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur- bg-black/60 backdrop-blur-xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="surface-1 text-main p-6 rounded-xl shadow-xl relative w-[93dvw] max-w-sm md:max-w-md duration-300 ease-out animate-ghostIn flex-col flex "
      >
        <Button
          className="absolute hover:bg-surface-hover top-3 w-7 h-7 right-3 text-on-surface/70 hover:text-on-surface centered rounded-full easy-transition"
          action={onClose}
        >
          ✕
        </Button>
        <h2 className="text-lg font-bold mb-4 capitalize">{modalTitle}</h2>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
