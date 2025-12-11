import styles from "./BoxContainer.module.css";

export function EmptyBoxContainer({ content, title, modifier }) {
  return (
    <div style={modifier}>
      <header className={styles.header}>{title}</header>
      <div className={styles.box}>{content}</div>
    </div>
  );
}
