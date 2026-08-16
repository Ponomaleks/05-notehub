import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

import css from './Modal.module.css';
import { useBodyOverflowHidden } from '../../hooks/useBodyOverflowHidden';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const Modal = ({ children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useBodyOverflowHidden();

  useEffect(() => {
    const focusableElements =
      modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const elements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );

        if (elements.length === 0) return;

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];
        const activeElement = document.activeElement as HTMLElement;

        const isFocusInsideModal = modalRef.current.contains(activeElement);

        if (!isFocusInsideModal) {
          event.preventDefault();
          if (event.shiftKey) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }
          return;
        }

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;
