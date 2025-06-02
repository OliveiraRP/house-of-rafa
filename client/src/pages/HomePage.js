import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginContainer from "../components/LoginContainer";
import AppListContainer from "../components/AppListContainer";
import "../styles/App.css";

function HomePage() {
  const { authState } = useContext(AuthContext);

  if (authState.loading) {
    return <div className="loading">Loading...</div>;
  }

  return authState.status ? <AppListContainer /> : <LoginContainer />;
}

export default HomePage;
