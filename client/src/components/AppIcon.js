import React from "react";
import "../styles/AppListContainer.css";

function AppIcon({ icon: Icon, onClick }) {
  return (
    <div className="app-icon" onClick={onClick}>
      <Icon size={48} color="#fff" />
    </div>
  );
}

export default AppIcon;
