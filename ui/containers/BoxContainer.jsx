import styles from "./BoxContainer.module.css";

export function EmptyBoxContainer({ content }) {
  return <div className={styles["empty-box"]}>{content}</div>;
}
