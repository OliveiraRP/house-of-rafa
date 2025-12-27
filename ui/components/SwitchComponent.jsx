import styles from "./SwitchComponent.module.css";

export function SwitchComponent({ state, onToggle }) {
  return (
    <div
      className={`${styles.toggleSwitch} ${state ? styles.active : ""}`}
      onClick={onToggle}
    >
      <span className={styles.toggleKnob}></span>
    </div>
  );
}
