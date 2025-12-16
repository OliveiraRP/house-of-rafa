import styles from "./OneColumnTemplate.module.css";

export function OneColumnTemplate({ header, children }) {
  return (
    <div className={styles.page}>
      <header>{header}</header>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
