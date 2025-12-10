import styles from "./AuthTemplate.module.css";

export function AuthTemplate({ component }) {
  return <div className={styles["auth-template"]}>{component}</div>;
}
