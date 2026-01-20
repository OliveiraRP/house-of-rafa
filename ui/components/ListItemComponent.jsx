import styles from "./ListItemComponent.module.css";
import { SwitchComponent } from "./SwitchComponent";

export function EmptyListItemComponent({ text, onClick }) {
  return (
    <div className={styles.row} onClick={onClick}>
      <span className={styles.title}>{text}</span>
    </div>
  );
}

export function TextListItemComponent({ text, value, onClick }) {
  return (
    <div className={styles.row} onClick={onClick}>
      <span className={styles.title}>{text}</span>
      <div className={styles.text}>{value}</div>
    </div>
  );
}

export function IconListItemComponent({ text, icon, onClick }) {
  return (
    <div className={styles.row} onClick={onClick}>
      <span className={styles.title}>{text}</span>
      {icon}
    </div>
  );
}

export function InputListItemComponent({
  text,
  value,
  onChange,
  placeholder,
  inputMode = "text",
}) {
  return (
    <div className={styles.row}>
      <span className={styles.title}>{text}</span>
      <input
        className={styles.input}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
}

export function SwitchListItemComponent({ text, state, onToggle }) {
  return (
    <div className={styles.row}>
      <span className={styles.title}>{text}</span>
      <SwitchComponent state={state} onToggle={onToggle} />
    </div>
  );
}

export function IconSubTextListItemComponent({
  icon,
  text,
  subtext,
  value,
  onClick,
}) {
  return (
    <div className={styles.row} onClick={onClick}>
      <div className={styles.leftSection}>
        {icon}
        <div className={styles.column}>
          <span className={styles.title}>{text}</span>
          <span className={styles.subtext}>{subtext}</span>
        </div>
      </div>
      <div className={styles.text}>{value}</div>
    </div>
  );
}

export function DateListItemComponent({ text, value, onChange }) {
  const formatDateLabel = (dateStr) => {
    if (!dateStr) return "";

    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const diffTime = targetDate - today;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";

    return targetDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className={styles.row}>
      <span className={styles.title}>{text}</span>
      <span className={styles.text}>{formatDateLabel(value)}</span>
      <input
        type="date"
        className={styles.dateInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
