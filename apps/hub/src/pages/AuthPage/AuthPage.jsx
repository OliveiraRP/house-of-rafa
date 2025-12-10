import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../api/auth.js";
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
      const res = await fetch("http://localhost:3000/api/check-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include", // important for cookie
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid token");
        return;
      }

      navigate("/apps");
    } catch (err) {
      setError("Network error");
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
