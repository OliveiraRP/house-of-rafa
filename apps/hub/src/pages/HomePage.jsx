import { ROUTES } from "../config/routes";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { GridContainer } from "@ui/containers/GridContainer";
import { AppComponent } from "@ui/components/AppComponent";
import { PageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { SectionHeaderComponent } from "../../../../ui/components/headers/SectionHeaderComponent";

import budgetManager from "../assets/icons/money-bag.png";

export default function HomePage() {
  const goToBudgetManager = () => {
    window.location.href = ROUTES.BUDGET_MANAGER;
  };

  const boxes = Array.from({ length: 9 }, (_, i) => (
    <AppComponent key={i} icon={budgetManager} onClick={goToBudgetManager} />
  ));

  return (
    <OneColumnTemplate header={<PageHeaderComponent title={"Discover"} />}>
      <GridContainer
        header={<SectionHeaderComponent title="App List" />}
        columnCount={3}
      >
        {boxes}{" "}
      </GridContainer>
    </OneColumnTemplate>
  );
}
