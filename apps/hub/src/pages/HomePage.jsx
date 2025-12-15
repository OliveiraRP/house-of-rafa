import { useEffect, useState } from "react";
import { ROUTES } from "../config/routes";
import { fetchCurrentUser } from "../api/auth";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { GridContainer } from "@ui/containers/GridContainer";
import { AppComponent } from "@ui/components/AppComponent";

import budgetManager from "../assets/icons/money-bag.png";

export default function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function loadUser() {
      const user = await fetchCurrentUser();
      if (!user) {
        return;
      }
      setUsername(user.username);
      localStorage.setItem("username", user.username);
    }

    loadUser();
  }, []);

  const goToBudgetManager = () => {
    window.location.href = ROUTES.BUDGET_MANAGER;
  };

  const boxes = Array.from({ length: 9 }, (_, i) => (
    <AppComponent icon={budgetManager} onClick={goToBudgetManager} />
  ));

  return (
    <OneColumnTemplate
      title="Discover"
      content={
        <GridContainer columnCount={3} title="App list" content={boxes} />
      }
    />
  );
}
