import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthTemplate } from "../../ui/templates/AuthTemplate.jsx";
import { EmptyBoxContainer } from "../../ui/containers/BoxContainer.jsx";
import { InputLeftIconComponent } from "../../ui/components/InputComponent.jsx";

import arrowIcon from "../../assets/icons/login.svg";
import keyIcon from "../../assets/icons/key.svg";

export default function AuthPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    if (!token) return;

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
        return;
      }

      navigate("/apps");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <AuthTemplate
      component={
        <EmptyBoxContainer
          width={350}
          content={
            <InputLeftIconComponent
              leftIcon={keyIcon}
              submitButtonIcon={arrowIcon}
              inputText={token}
              errorText={error}
              onChange={(e) => setToken(e.target.value)}
              onClick={handleSubmit}
            />
          }
        />
      }
    />
  );
}
