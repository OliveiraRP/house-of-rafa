import styles from "./CardComponent.module.css";

export function CardComponent({ title, description, icon, onClick }) {
  return (
    <div className={styles.box} onClick={onClick} role="button">
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
