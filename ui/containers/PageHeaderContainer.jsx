import styles from "./PageHeaderContainer.module.css";

export function PageHeaderContainer({ title, modifier }) {
  return (
    <div style={modifier}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export function TwoButtonPageHeaderContainer({
  title,
  leftButton,
  rightButton,
  modifier,
}) {
  return (
    <div style={modifier}>
      <div className={styles.buttons}>
        {leftButton}
        {rightButton}
      </div>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}
