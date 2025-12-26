import { motion } from "framer-motion";
import styles from "./ButtonComponent.module.css";

export function TextButtonComponent({ text, onClick, modifier }) {
  return (
    <div style={modifier}>
      <motion.button
        onClick={onClick}
        whileTap={{
          scale: 1.25,
          boxShadow: `
            inset 0 0 20px rgba(255, 255, 255, 0.8),
            inset 0 4px 8px rgba(255, 255, 255, 0.15),
            10px 15px 20px rgba(0, 0, 0, 0.05)
          `.trim(),
        }}
        transition={{ duration: 0.075 }}
      >
        {text}
      </motion.button>
    </div>
  );
}

export function IconButtonComponent({ icon, onClick, modifier }) {
  return (
    <div style={modifier}>
      <motion.button
        className={styles.iconButton}
        onClick={onClick}
        whileTap={{
          scale: 1.25,
          boxShadow: `
            inset 0 0 20px rgba(255, 255, 255, 0.8),
            inset 0 4px 8px rgba(255, 255, 255, 0.15),
            10px 15px 20px rgba(0, 0, 0, 0.05)
          `.trim(),
        }}
        transition={{ duration: 0.075 }}
      >
        {icon}
      </motion.button>
    </div>
  );
}
