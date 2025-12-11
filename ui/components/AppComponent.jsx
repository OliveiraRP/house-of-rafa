import styles from "./AppComponent.module.css";

export function AppComponent({ icon, onClick, modifier }) {
  return (
    <div style={modifier}>
      <div className={styles.box} onClick={onClick}>
        <img src={icon} alt={name} className={styles.icon} />
      </div>
    </div>
  );
}
