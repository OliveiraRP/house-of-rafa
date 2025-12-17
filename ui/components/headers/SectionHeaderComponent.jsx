import styles from "./SectionHeaderComponent.module.css";

export function SectionHeaderComponent({ title, modifier }) {
  return (
    <div style={modifier}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
    </div>
  );
}
