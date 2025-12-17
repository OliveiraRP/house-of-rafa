import styles from "./CardComponent.module.css";

export function CardComponent({ title, description, icon }) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <div className={styles.textColumn}>
          {title}
          {description}
        </div>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
      </div>
    </div>
  );
}
