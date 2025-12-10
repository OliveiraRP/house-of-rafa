import styles from "./BoxContainer.module.css";

export function EmptyBoxContainer({ width, content }) {
  return (
    <div className={styles["empty-box"]} style={{ width: `${width}px` }}>
      {content}
    </div>
  );
}
