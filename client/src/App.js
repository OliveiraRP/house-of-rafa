import React, { useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import { checkAuth, loginUser } from "./services/api";
import "./styles/App.css";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    loading: true,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.success) {
          setAuthState({
            username: response.user.username,
            id: response.user.id,
            status: true,
            loading: false,
          });
        } else {
          setAuthState((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };

    verifyAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      const data = response.data;

      localStorage.setItem("accessToken", data.token);
      setAuthState({
        username: data.username,
        id: data.id,
        status: true,
        loading: false,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      <HomePage />
    </AuthContext.Provider>
  );
}

export default App;
