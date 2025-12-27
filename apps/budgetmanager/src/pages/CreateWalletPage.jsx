import { useState } from "react";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import {
  EmptyListItemComponent,
  InputListItemComponent,
  TextListItemComponent,
  SwitchListItemComponent,
} from "@ui/components/ListItemComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { WALLET_TYPES } from "../constants/wallets";

export function CreateWalletPage({ onClose }) {
  const { view, direction, navigateTo } = useViewNavigation(0);

  const [walletData, setWalletData] = useState({
    name: "",
    type: WALLET_TYPES.EXPENSE,
    balance: "",
    includeInNetWorth: true,
  });

  const handleTypeSelect = (selectedType) => {
    setWalletData((prev) => ({ ...prev, type: selectedType }));
    navigateTo(0);
  };

  const handleSubmit = () => {
    console.log("Submitting Wallet Data:", walletData);
    // Logic to save to DB here...
    onClose();
  };

  return (
    <ViewSwitcher view={view} direction={direction}>
      {view === 0 ? (
        <OneColumnTemplate
          header={
            <TwoButtonSubtitlePageHeaderComponent
              leftButton={
                <IconButtonComponent
                  icon={<IconRes icon={ICON.CLOSE} />}
                  onClick={onClose}
                />
              }
              title="Create wallet"
              rightButton={
                <IconButtonComponent
                  icon={<IconRes icon={ICON.ADD} />}
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "var(--color-accent-primary)",
                  }}
                />
              }
            />
          }
        >
          <VerticalListContainer>
            <InputListItemComponent
              text="Name"
              value={walletData.name}
              placeholder="Name"
              onChange={(val) => setWalletData({ ...walletData, name: val })}
            />
            <TextListItemComponent
              text="Type"
              value={walletData.type}
              onClick={() => navigateTo(1)}
            />
            <InputListItemComponent
              text="Balance"
              value={walletData.balance}
              placeholder="€0.00"
              inputMode="decimal"
              onChange={(val) => {
                const digits = val.replace(/\D/g, "");
                const numberValue = (Number(digits) / 100).toFixed(2);
                setWalletData((prev) => ({ ...prev, balance: numberValue }));
              }}
            />
            <SwitchListItemComponent
              text="Include in net worth"
              state={walletData.includeInNetWorth}
              onToggle={() =>
                setWalletData((prev) => ({
                  ...prev,
                  includeInNetWorth: !prev.includeInNetWorth,
                }))
              }
            />
          </VerticalListContainer>
        </OneColumnTemplate>
      ) : (
        <OneColumnTemplate
          header={
            <TwoButtonSubtitlePageHeaderComponent
              leftButton={
                <IconButtonComponent
                  icon={<IconRes icon={ICON.BACK} />}
                  onClick={() => navigateTo(0)}
                />
              }
              title="Type"
            />
          }
        >
          <VerticalListContainer>
            {Object.values(WALLET_TYPES).map((type) => (
              <EmptyListItemComponent
                key={type}
                text={type}
                onClick={() => handleTypeSelect(type)}
              />
            ))}
          </VerticalListContainer>
        </OneColumnTemplate>
      )}
    </ViewSwitcher>
  );
}
