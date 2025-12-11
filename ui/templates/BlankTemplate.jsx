import styles from "./BlankTemplate.module.css";

export function BlankTemplate({ content }) {
  return <div className={styles.page}>{content}</div>;
}
