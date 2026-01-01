import { useState } from "react";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { GridContainer } from "@ui/containers/GridContainer";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import {
  EmptyListItemComponent,
  InputListItemComponent,
  TextListItemComponent,
  SwitchListItemComponent,
} from "@ui/components/ListItemComponent";
import { WalletDetailsCard } from "../../ui/WalletDetailsCard";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { WALLET_TYPES } from "../../constants/wallets";
import { PALETTE_LIST, WALLET_PALETTE } from "../../constants/colors";
import { WALLET_ICONS } from "../../constants/icons";
import { formatEuro } from "../../utils/currency";
import { useCreateWallet } from "../../hooks/useWallets";

export function CreateWalletPage({ onClose }) {
  const { view, direction, navigateTo } = useViewNavigation(0);
  const createMutation = useCreateWallet();

  const [walletData, setWalletData] = useState({
    name: "New Wallet",
    icon: WALLET_ICONS.at(0),
    color: WALLET_PALETTE.INDIGO.id,
    type: WALLET_TYPES.EXPENSE,
    balance: "",
    includeInNetWorth: true,
  });

  const handleSubmit = () => {
    const colorHex = WALLET_PALETTE[walletData.color.toUpperCase()]?.hex;
    const payload = {
      name: walletData.name,
      type: walletData.type.toLowerCase(),
      balance: Number(walletData.balance),
      includeInNetWorth: walletData.includeInNetWorth,
      color: colorHex,
      icon: walletData.icon,
    };

    createMutation.mutate(payload, {
      onSuccess: onClose,
      onError: (err) => alert(err.message),
    });
  };

  const selectedColorHex = WALLET_PALETTE[walletData.color.toUpperCase()]?.hex;

  return (
    <ViewSwitcher view={view} direction={direction}>
      {(() => {
        switch (view) {
          case 0:
            return (
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
                        disabled={createMutation.isPending}
                        style={{
                          backgroundColor: "var(--color-accent-primary)",
                        }}
                      />
                    }
                  />
                }
              >
                <WalletDetailsCard
                  name={walletData.name}
                  icon={walletData.icon}
                  colors={PALETTE_LIST}
                  selectedColorId={walletData.color}
                  selectedColorHex={selectedColorHex}
                  onSelect={(id) =>
                    setWalletData((prev) => ({ ...prev, color: id }))
                  }
                  onIconClick={() => navigateTo(2)}
                  onNameChange={(newName) =>
                    setWalletData((prev) => ({ ...prev, name: newName }))
                  }
                />
                <VerticalListContainer isElevated={true}>
                  <TextListItemComponent
                    text="Type"
                    value={walletData.type}
                    onClick={() => navigateTo(1)}
                  />
                  <InputListItemComponent
                    text="Balance"
                    value={
                      walletData.balance ? formatEuro(walletData.balance) : ""
                    }
                    placeholder="€0.00"
                    inputMode="decimal"
                    onChange={(val) => {
                      const digits = val.replace(/\D/g, "");
                      const numberValue = (Number(digits) / 100).toFixed(2);
                      setWalletData((prev) => ({
                        ...prev,
                        balance: numberValue,
                      }));
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
            );
          case 1:
            return (
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
                <VerticalListContainer isElevated={true}>
                  {Object.values(WALLET_TYPES).map((type) => (
                    <EmptyListItemComponent
                      key={type}
                      text={type}
                      onClick={() => {
                        setWalletData((prev) => ({ ...prev, type }));
                        navigateTo(0);
                      }}
                    />
                  ))}
                </VerticalListContainer>
              </OneColumnTemplate>
            );
          case 2:
            return (
              <OneColumnTemplate
                header={
                  <TwoButtonSubtitlePageHeaderComponent
                    leftButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.BACK} />}
                        onClick={() => navigateTo(0)}
                      />
                    }
                    title="Icon"
                  />
                }
              >
                <GridContainer columnCount={6}>
                  {WALLET_ICONS.map((iconName) => (
                    <div
                      key={iconName}
                      onClick={() => {
                        setWalletData((prev) => ({ ...prev, icon: iconName }));
                        navigateTo(0);
                      }}
                    >
                      <IconRes icon={iconName} size={32} />
                    </div>
                  ))}
                </GridContainer>
              </OneColumnTemplate>
            );
          default:
            return null;
        }
      })()}
    </ViewSwitcher>
  );
}
