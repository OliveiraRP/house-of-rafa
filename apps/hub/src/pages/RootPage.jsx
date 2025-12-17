import { useEffect, useState } from "react";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import { fetchCurrentUser } from "../api/auth.api";

export default function RootPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function check() {
      const user = await fetchCurrentUser();
      if (user) setIsAuthenticated(true);
    }
    check();
  }, []);

  return isAuthenticated ? (
    <HomePage />
  ) : (
    <AuthPage onLogin={() => setIsAuthenticated(true)} />
  );
}
