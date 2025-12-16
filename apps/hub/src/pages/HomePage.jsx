import { ROUTES } from "../config/routes";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { GridContainer } from "@ui/containers/GridContainer";
import { AppComponent } from "@ui/components/AppComponent";
import { PageHeaderContainer } from "@ui/containers/PageHeaderContainer";

import budgetManager from "../assets/icons/money-bag.png";

export default function HomePage() {
  const goToBudgetManager = () => {
    window.location.href = ROUTES.BUDGET_MANAGER;
  };

  const boxes = Array.from({ length: 9 }, (_, i) => (
    <AppComponent key={i} icon={budgetManager} onClick={goToBudgetManager} />
  ));

  return (
    <OneColumnTemplate header={<PageHeaderContainer title={"Discover"} />}>
      <GridContainer columnCount={3} title="App list" content={boxes} />
    </OneColumnTemplate>
  );
}
