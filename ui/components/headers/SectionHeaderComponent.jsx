import styles from "./SectionHeaderComponent.module.css";

export function SectionHeaderComponent({ title }) {
  return (
    <div className={styles.title}>
      <h3>{title}</h3>
    </div>
  );
}

export function SubTitleSectionHeaderComponent({ subTitle }) {
  return (
    <div className={styles.subTitle}>
      <h4>{subTitle}</h4>
    </div>
  );
}
