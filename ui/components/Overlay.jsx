import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Overlay.module.css";

export function FullScreenOverlay({ isOpen, onClose, children }) {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);

      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = "unset";
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div
        className={`${styles.backdrop} ${isAnimating ? styles.visible : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.overlay} ${isAnimating ? styles.open : ""}`}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
