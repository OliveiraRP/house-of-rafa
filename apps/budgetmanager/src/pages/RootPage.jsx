import { useEffect, useState } from "react";
import { ENV } from "../config/env.js";
import { fetchCurrentUser } from "../api/auth.api";
import WalletsPage from "./WalletsPage.jsx";

export default function RootPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await fetchCurrentUser();
      if (!currentUser) {
        window.location.href = ENV.HUB_URL;
        return;
      }

      setUser(currentUser);
    }

    checkAuth();
  }, []);

  return <WalletsPage user={user} />;
}
