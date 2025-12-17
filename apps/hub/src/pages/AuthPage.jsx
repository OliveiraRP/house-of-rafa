import { useState } from "react";
import { ROUTES, API } from "../config/routes";
import { BlankTemplate } from "@ui/templates/BlankTemplate";
import { CardComponent } from "@ui/components/CardComponent";
import { InputComponent } from "@ui/components/InputComponent";

import arrowIcon from "../assets/icons/login.svg";
import keyIcon from "../assets/icons/key.svg";

export default function AuthPage({ onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${ROUTES.BACKEND}${API.CHECK_TOKEN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid token");
        setLoading(false);
        return;
      }

      onLogin();
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <BlankTemplate
      content={
        <CardComponent>
          <InputComponent
            leftIcon={keyIcon}
            submitButtonIcon={arrowIcon}
            inputText={token}
            errorText={error}
            onChange={(e) => setToken(e.target.value)}
            onSubmit={handleSubmit}
          />
        </CardComponent>
      }
    />
  );
}
