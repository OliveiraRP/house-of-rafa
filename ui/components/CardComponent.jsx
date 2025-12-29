import styles from "./CardComponent.module.css";
import { IconRes } from "../utils/IconRes.jsx";
import { IconButtonComponent } from "./ButtonComponent.jsx";

export function CardComponent({
  title,
  description,
  icon,
  onClick,
  isEditMode = false,
  onEditAction,
  editIcon,
}) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.actionWrapper} ${isEditMode ? styles.active : ""}`}
      >
        <IconButtonComponent
          icon={<IconRes icon={editIcon} />}
          onClick={(e) => {
            e.stopPropagation();
            onEditAction?.();
          }}
          style={{
            backgroundColor: "var(--color-error)",
          }}
        />
      </div>
      <div
        className={`${styles.box} ${isEditMode ? styles.shifted : ""}`}
        onClick={(e) => {
          if (!isEditMode) {
            onClick?.(e);
          }
        }}
        role="button"
      >
        <div className={styles.content}>
          <div className={styles.textColumn}>
            {title}
            {description}
          </div>
          <div className={styles.iconWrapper}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
