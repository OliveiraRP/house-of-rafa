import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { TextRes } from "@ui/utils/TextRes";
import { shiftMonthSafe } from "../utils/date";
import styles from "./TimeframeComponent.module.css";

export function TimeframeComponent({ startDate, onRangeChange, onClick }) {
  if (!startDate) return null;

  const [y, m, d] = startDate.split("-").map(Number);
  const startObj = new Date(y, m - 1, d);
  const endObj = new Date(y, m, d - 1);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  return (
    <div className={styles.container}>
      <IconButtonComponent
        icon={<IconRes icon={ICON.BACK} />}
        onClick={() => onRangeChange(shiftMonthSafe(startDate, -1))}
      />

      <div className={styles.label}>
        <TextRes
          text={`${formatDate(startObj)} - ${formatDate(endObj)}`}
          onClick={onClick}
        />
      </div>

      <IconButtonComponent
        icon={<IconRes icon={ICON.NEXT} />}
        onClick={() => onRangeChange(shiftMonthSafe(startDate, 1))}
      />
    </div>
  );
}
