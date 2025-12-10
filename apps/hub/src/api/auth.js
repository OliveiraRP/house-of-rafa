export async function checkToken(token) {
  const res = await fetch("http://localhost:3000/api/check-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Invalid token");
  }

  return data;
}
