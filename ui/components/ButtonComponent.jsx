import { IconRes } from "../utils/IconRes";
import styles from "./ButtonComponent.module.css";

export function TextButtonComponent({ text, onClick, modifier }) {
  return (
    <div style={modifier}>
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

export function IconButtonComponent({ icon, onClick, modifier }) {
  return (
    <div style={modifier}>
      <button onClick={onClick} className={styles.iconButton}>
        <IconRes icon={icon} alt="Add" className={styles.icon} />
      </button>
    </div>
  );
}
