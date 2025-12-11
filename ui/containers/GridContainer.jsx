import styles from "./GridContainer.module.css";

export function GridContainer({ columnCount, title, content, modifier }) {
  return (
    <div style={modifier}>
      <header className={styles.header}>
        <h3>{title}</h3>
      </header>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
      >
        {content}
      </div>
    </div>
  );
}
