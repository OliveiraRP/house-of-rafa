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
