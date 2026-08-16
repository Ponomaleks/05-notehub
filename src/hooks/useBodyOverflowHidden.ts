import { useEffect } from "react";

export function useBodyOverflowHidden(returnFocus: boolean = true) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const previousActiveElement = document.activeElement as HTMLElement;

    return () => {
      document.body.style.overflow = originalOverflow;
      if (returnFocus) {
        previousActiveElement?.focus();
      }
    };
  }, [returnFocus]);
}