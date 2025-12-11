import { IconRes } from "../utils/IconRes";
import styles from "./InputComponent.module.css";

export function InputComponent({
  leftIcon,
  submitButtonIcon,
  inputText,
  errorText,
  onChange,
  onSubmit,
  modifier,
}) {
  return (
    <form
      style={modifier}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={styles["input-form"]}>
        <div className={styles["input-left-icon"]}>
          <IconRes icon={leftIcon} />
        </div>
        <input
          type="text"
          className={styles["input-text"]}
          value={inputText}
          onChange={onChange}
        />
        <button type="submit" className={styles["submit-button"]}>
          <IconRes icon={submitButtonIcon} alt="Submit" />
        </button>
      </div>
      {errorText && <div className={styles["error-text"]}>{errorText}</div>}
    </form>
  );
}
