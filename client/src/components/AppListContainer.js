import React from "react";
import { AiTwotoneEuro } from "react-icons/ai";
import "../styles/AppListContainer.css";
import AppIcon from "./AppIcon";
import { APP_LINKS } from "../config/links";

function AppListContainer() {
  const token = localStorage.getItem("accessToken");

  const budgetManagerRedirectUrl = `${APP_LINKS.budgetManager}?token=${token}`;

  return (
    <div className="app-list-container">
      <AppIcon
        icon={AiTwotoneEuro}
        onClick={() => (window.location.href = budgetManagerRedirectUrl)}
      />
    </div>
  );
}

export default AppListContainer;
