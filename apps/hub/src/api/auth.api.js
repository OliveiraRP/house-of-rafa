import { ENV } from "../config/env";

const AUTH_BASE = `${ENV.BACKEND_URL}/api/v1/auth`;

export async function checkToken(token) {
  const res = await fetch(`${AUTH_BASE}/check-token`, {
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
  const res = await fetch(`${AUTH_BASE}/me`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}
