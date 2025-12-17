import styles from "./GridContainer.module.css";

export function GridContainer({ header, columnCount, children, modifier }) {
  return (
    <div style={modifier}>
      {header}
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
      >
        {children}
      </div>
    </div>
  );
}
