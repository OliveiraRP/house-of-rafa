import styles from "./OneColumnTemplate.module.css";

export function OneColumnTemplate({ content }) {
  return <div className={styles["one-column-template"]}>{content}</div>;
}
