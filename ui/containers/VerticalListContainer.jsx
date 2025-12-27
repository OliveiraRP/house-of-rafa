import styles from "./VerticalListContainer.module.css";

export function VerticalListContainer({ header, children, modifier }) {
  return (
    <div style={modifier}>
      <div className={styles.container}>
        {header}
        <div className={styles.list}>{children}</div>
      </div>
    </div>
  );
}

export function SpacedVerticalListContainer({ header, children, modifier }) {
  return (
    <div style={modifier}>
      <div className={styles.container}>
        {header}
        <div className={styles.spacedList}>{children}</div>
      </div>
    </div>
  );
}
