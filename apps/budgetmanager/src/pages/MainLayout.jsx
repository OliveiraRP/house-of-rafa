import { useState } from "react";
import WalletsPage from "./wallets/WalletsPage";
import { TabBarComponent } from "@ui/components/navigation/TabBarComponent";
import { ICON } from "@ui/constants/icons";
import OverviewPage from "./overview/OverviewPage";

const TABS = [
  { id: "overview", label: "Overview", icon: ICON.EYE },
  { id: "budget", label: "Budget", icon: ICON.CHART },
  { id: "wallets", label: "Wallets", icon: ICON.WALLET },
];

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderPage = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage />;
      case "budget":
        return <div></div>;
      case "wallets":
        return <WalletsPage />;
      default:
        return <WalletsPage />;
    }
  };

  return (
    <>
      {renderPage()}
      <TabBarComponent
        tabs={TABS}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
}
