import { useState } from "react";
import { checkToken } from "../api/auth.api";
import { BlankTemplate } from "@ui/templates/BlankTemplate";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { InputComponent } from "@ui/components/InputComponent";

import arrowIcon from "../assets/icons/login.svg";
import keyIcon from "../assets/icons/key.svg";

export default function AuthPage({ onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!token) return;

    setError("");
    setLoading(true);

    try {
      await checkToken(token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlankTemplate
      content={
        <EmptyBoxContainer>
          <InputComponent
            leftIcon={keyIcon}
            submitButtonIcon={arrowIcon}
            inputText={token}
            errorText={error}
            onChange={(e) => setToken(e.target.value)}
            onSubmit={handleSubmit}
          />
        </EmptyBoxContainer>
      }
    />
  );
}
