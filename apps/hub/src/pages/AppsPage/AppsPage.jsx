import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../../api/auth.js";
import styles from "./AppsPage.module.css";
import budgetIcon from "../../assets/icons/key.svg";

export default function AppsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function loadUser() {
      const user = await fetchCurrentUser();
      if (!user) {
        navigate("/");
        return;
      }
      setUsername(user.username);
      localStorage.setItem("username", user.username);
    }

    loadUser();
  }, []);

  const goToBudgetManager = () => {
    window.location.href = "http://localhost:5174";
  };

  return (
    <div className={styles.page}>
      <h1>Welcome, {username}</h1>
      <div className={styles.appGrid}>
        <div className={styles.appCard} onClick={goToBudgetManager}>
          <img src={budgetIcon} alt="Budget Manager" />
          <p>Budget Manager</p>
        </div>
      </div>
    </div>
  );
}
