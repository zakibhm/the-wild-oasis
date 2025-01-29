import { useEffect, useRef } from "react";

export function useOutsideClick(closeModal, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("click", handleClickOutside, listenCapturing);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
    };
  }, [closeModal]);

  return ref;
}
