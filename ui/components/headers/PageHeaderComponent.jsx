import styles from "./PageHeaderComponent.module.css";

export function PageHeaderComponent({ title, modifier }) {
  return (
    <div style={modifier}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export function TwoButtonPageHeaderComponent({
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
