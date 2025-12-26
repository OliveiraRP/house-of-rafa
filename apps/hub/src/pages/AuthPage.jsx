import { useState } from "react";
import { checkToken } from "../api/auth.api";
import { BlankTemplate } from "@ui/templates/BlankTemplate";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { InputComponent } from "@ui/components/InputComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";

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
            leftIcon={<IconRes icon={ICON.KEY} />}
            submitButtonIcon={<IconRes icon={ICON.LOGIN} alt="Submit" />}
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
