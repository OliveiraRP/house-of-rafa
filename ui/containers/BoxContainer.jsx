import styles from "./BoxContainer.module.css";

export function EmptyBoxContainer({
  children,
  modifier,
  color = "var(--color-bg-hover)",
  onClick,
}) {
  return (
    <div
      className={styles.box}
      onClick={onClick}
      style={{
        backgroundColor: color,
        cursor: onClick ? "pointer" : "default",
        ...modifier,
      }}
    >
      {children}
    </div>
  );
}
