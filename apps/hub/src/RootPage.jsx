import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import AppsPage from "./pages/AppsPage/AppsPage";
import { fetchCurrentUser } from "./api/auth";

export default function RootPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const user = await fetchCurrentUser();
      if (user) setIsAuthenticated(true);
      setLoading(false);
    }
    check();
  }, []);

  if (loading) return null;

  return isAuthenticated ? (
    <AppsPage />
  ) : (
    <AuthPage onLogin={() => setIsAuthenticated(true)} />
  );
}
