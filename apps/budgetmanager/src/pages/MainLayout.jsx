import { useState } from "react";
import WalletsPage from "./WalletsPage";
import { TabBarComponent } from "@ui/components/navigation/TabBarComponent";
import { ICON } from "@ui/constants/icons";

const TABS = [
  { id: "overview", label: "Overview", icon: ICON.EYE },
  { id: "budget", label: "Budget", icon: ICON.CHART },
  { id: "wallets", label: "Wallets", icon: ICON.WALLET },
];

export default function MainLayout({ user }) {
  const [activeTab, setActiveTab] = useState("wallets");

  const renderPage = () => {
    switch (activeTab) {
      case "overview":
        return <div></div>;
      case "budget":
        return <div></div>;
      case "wallets":
        return <WalletsPage user={user} />;
      default:
        return <WalletsPage user={user} />;
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
