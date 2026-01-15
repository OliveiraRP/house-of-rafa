import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { EmptyRoundBoxContainer } from "@ui/containers/BoxContainer";
import styles from "./CategoryIcon.module.css";

export function CategoryIcon({ icon, color, size = 36, iconSize = 24 }) {
  return (
    <div className={styles.container}>
      <EmptyRoundBoxContainer
        color={color || "var(--color-bg-hover)"}
        modifier={{
          height: `${size}px`,
          width: `${size}px`,
          padding: "8px",
        }}
      >
        <IconRes icon={icon} size={iconSize} />
      </EmptyRoundBoxContainer>
    </div>
  );
}
