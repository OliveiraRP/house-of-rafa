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
        <div className={styles["input-left-icon"]}>{leftIcon}</div>
        <input
          type="text"
          className={styles["input-text"]}
          value={inputText}
          onChange={onChange}
        />
        <button type="submit" className={styles["submit-button"]}>
          {submitButtonIcon}
        </button>
      </div>
      {errorText && <div className={styles["error-text"]}>{errorText}</div>}
    </form>
  );
}
