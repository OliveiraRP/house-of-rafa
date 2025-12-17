import { useCallback } from "react";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonPageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { SpacedVerticalListContainer } from "@ui/containers/VerticalListContainer";
import { CardComponent } from "@ui/components/CardComponent";
import { TextRes } from "@ui/utils/TextRes";
import { IconRes } from "@ui/utils/IconRes";

import settingsIcon from "../assets/icons/settings.svg";
import plusIcon from "../assets/icons/plus.svg";

export default function HomePage() {
  // TODO: Replace with real data from backend/API
  const getWallets = useCallback(() => {
    return [
      { id: 1, name: "Wallet 1", balance: "1234€" },
      { id: 2, name: "Wallet 2", balance: "567€" },
      { id: 3, name: "Wallet 3", balance: "8901€" },
    ];
  }, []);

  const wallets = getWallets();

  // TODO: Implement navigation to settings screen or open settings modal
  const handleSettingsPress = useCallback(() => {
    // TODO: Navigate to settings or open wallet settings
  }, []);

  // TODO: Implement add new wallet flow (modal, form, etc.)
  const handleAddWalletPress = useCallback(() => {
    // TODO: Open add wallet sheet/modal
  }, []);

  return (
    <OneColumnTemplate
      header={
        <TwoButtonPageHeaderComponent
          leftButton={
            <IconButtonComponent
              icon={settingsIcon}
              onClick={handleSettingsPress}
            />
          }
          rightButton={
            <IconButtonComponent
              icon={plusIcon}
              onClick={handleAddWalletPress}
            />
          }
          title="Wallets"
        />
      }
    >
      <SpacedVerticalListContainer>
        {wallets.map((wallet) => (
          <CardComponent
            key={wallet.id}
            title={
              <TextRes
                text={wallet.name}
                color="var(--color-accent-primary)"
                style={{ fontWeight: 600 }}
              />
            }
            description={
              <TextRes
                text={wallet.balance}
                style={{ fontWeight: 700, fontSize: 24 }}
              />
            }
            icon={<IconRes icon={settingsIcon} />}
          />
        ))}
      </SpacedVerticalListContainer>
    </OneColumnTemplate>
  );
}
