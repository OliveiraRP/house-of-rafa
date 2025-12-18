import { useState } from "react";
import { checkToken } from "../api/auth.api";
import { BlankTemplate } from "@ui/templates/BlankTemplate";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { InputComponent } from "@ui/components/InputComponent";
import { IconRes } from "@ui/utils/IconRes";

import arrowIcon from "@ui/assets/icons/login.svg";
import keyIcon from "@ui/assets/icons/key.svg";

export default function AuthPage({ onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!token) return;

    setError("");

    try {
      await checkToken(token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BlankTemplate
      content={
        <EmptyBoxContainer>
          <InputComponent
            leftIcon={<IconRes icon={keyIcon} />}
            submitButtonIcon={<IconRes icon={arrowIcon} alt="Submit" />}
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
