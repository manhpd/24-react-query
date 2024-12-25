import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose } : { children: any, onClose: any }) {
  const dialog = useRef() as any;

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current as any;
    if (modal) {
      modal.showModal();
    }

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return null;

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot
  );
}
