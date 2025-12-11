import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { fetchCurrentUser } from "./api/auth";

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
