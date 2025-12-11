import { IconRes } from "../utils/IconRes";
import styles from "./InputComponent.module.css";

export function InputComponent({
  submitButtonIcon,
  inputText,
  errorText,
  onChange,
  onClick,
}) {
  return (
    <div>
      <div className={styles["input-form"]}>
        <input
          type="text"
          className={styles["input-text"]}
          value={inputText}
          onChange={onChange}
        />
        <button className={styles["submit-button"]} onClick={onClick}>
          <img src={submitButtonIcon} alt="Submit" />
        </button>
      </div>
      {errorText && <div className={styles["error-text"]}>{errorText}</div>}
    </div>
  );
}

export function InputLeftIconComponent({
  leftIcon,
  submitButtonIcon,
  inputText,
  errorText,
  onChange,
  onClick,
}) {
  return (
    <div>
      <div className={styles["input-form"]}>
        <div className={styles["input-left-icon"]}>
          <IconRes icon={leftIcon} alt="Submit" />
        </div>
        <input
          type="text"
          className={styles["input-text"]}
          value={inputText}
          onChange={onChange}
        />
        <button className={styles["submit-button"]} onClick={onClick}>
          <IconRes icon={submitButtonIcon} alt="Submit" />
        </button>
      </div>
      {errorText && <div className={styles["error-text"]}>{errorText}</div>}
    </div>
  );
}
