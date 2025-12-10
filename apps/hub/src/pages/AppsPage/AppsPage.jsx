import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("username");

    if (!token || !storedUser) {
      navigate("/");
      return;
    }

    setUsername(storedUser);
  }, []);

  return <div></div>;
}
