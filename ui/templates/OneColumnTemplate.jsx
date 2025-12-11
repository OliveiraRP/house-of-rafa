import styles from "./OneColumnTemplate.module.css";

export function OneColumnTemplate({ title, content }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{title}</h1>
      </header>
      <main className={styles.content}>{content}</main>
    </div>
  );
}
