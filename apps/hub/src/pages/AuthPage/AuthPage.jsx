import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../api/auth.js"; // relative path
import styles from "./AuthPage.module.css";

import arrowIcon from "../../assets/icons/login.svg";
import keyIcon from "../../assets/icons/key.svg";

export default function AuthPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (!token) return;

    try {
      const data = await checkToken(token);
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", data.username);
      navigate("/apps");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-card"]}>
        <div className={styles["auth-form"]}>
          <div className={styles["input-wrapper"]}>
            <img src={keyIcon} alt="" className={styles["input-icon"]} />
            <input
              type="text"
              className={styles["auth-input"]}
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <button className={styles["auth-submit-btn"]} onClick={handleSubmit}>
            <img
              src={arrowIcon}
              alt="Submit"
              className={styles["auth-submit-icon"]}
            />
          </button>
        </div>

        {error && <p className={styles["auth-error"]}>{error}</p>}
      </div>
    </div>
  );
}
