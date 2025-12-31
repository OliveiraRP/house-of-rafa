import styles from "./VerticalListContainer.module.css";

export function VerticalListContainer({ header, children, isElevated }) {
  return (
    <div className={styles.container}>
      {header}
      <div
        className={`${styles.list} ${isElevated ? styles.elevatedList : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export function SpacedVerticalListContainer({ header, children, isElevated }) {
  return (
    <div className={styles.container}>
      {header}
      <div
        className={`${styles.spacedList} ${
          isElevated ? styles.elevatedList : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
