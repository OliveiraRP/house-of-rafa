import { useState } from "react";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate.jsx";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer.jsx";
import { InputComponent } from "@ui/components/InputComponent.jsx";

import arrowIcon from "../../assets/icons/login.svg";
import keyIcon from "../../assets/icons/key.svg";

export default function AuthPage({ onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/check-token", {
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
    <OneColumnTemplate
      content={
        <EmptyBoxContainer
          content={
            <InputComponent
              leftIcon={keyIcon}
              submitButtonIcon={arrowIcon}
              inputText={token}
              errorText={error}
              onChange={(e) => setToken(e.target.value)}
              onSubmit={handleSubmit}
            />
          }
        />
      }
    />
  );
}
