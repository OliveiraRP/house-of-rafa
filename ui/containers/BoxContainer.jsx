import styles from "./BoxContainer.module.css";

export function EmptyBoxContainer({ children, modifier }) {
  return (
    <div style={modifier}>
      <div className={styles.box}>{children}</div>
    </div>
  );
}
