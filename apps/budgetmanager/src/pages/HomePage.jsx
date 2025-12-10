import { useEffect, useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("http://localhost:3000/api/me", {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        setUsername(data.username);
      } catch {}
    }
    loadUser();
  }, []);

  return (
    <div>
      <h1>Hello {username}</h1>
    </div>
  );
}
