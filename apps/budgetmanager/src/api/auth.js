import { ROUTES, API } from "../config/routes";

export async function checkToken(token) {
  const res = await fetch(`${ROUTES.BACKEND}${API.CHECK_TOKEN}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Invalid token");
  }

  return data;
}

export async function fetchCurrentUser() {
  const res = await fetch(`${ROUTES.BACKEND}${API.ME}`, {
    credentials: "include",
  });

  if (!res.ok) return null;

  return res.json();
}
