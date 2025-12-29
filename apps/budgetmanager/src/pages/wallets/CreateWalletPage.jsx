import { useState } from "react";
import { ENV } from "../../config/env";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { GridContainer } from "@ui/containers/GridContainer";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import {
  EmptyListItemComponent,
  InputListItemComponent,
  TextListItemComponent,
  SwitchListItemComponent,
} from "@ui/components/ListItemComponent";
import { HorizontalColorPickerComponent } from "@ui/components/ColorPickerComponent";

import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { WALLET_TYPES } from "../../constants/wallets";
import { PALETTE_LIST, WALLET_PALETTE } from "../../constants/colors";
import { WALLET_ICONS } from "../../constants/icons";

export function CreateWalletPage({ onClose }) {
  const { view, direction, navigateTo } = useViewNavigation(0);

  const [walletData, setWalletData] = useState({
    name: "",
    icon: WALLET_ICONS.at(0),
    color: WALLET_PALETTE.INDIGO.id,
    type: WALLET_TYPES.EXPENSE,
    balance: "",
    includeInNetWorth: true,
  });

  const handleSubmit = async () => {
    if (!walletData.name.trim()) return alert("Wallet name is required");

    const colorHex = WALLET_PALETTE[walletData.color.toUpperCase()]?.hex;

    try {
      const response = await fetch(`${ENV.BACKEND_URL}/api/v1/wallets`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: walletData.name,
          type: walletData.type.toLowerCase(),
          balance: Number(walletData.balance),
          includeInNetWorth: walletData.includeInNetWorth,
          color: colorHex,
          icon: walletData.icon,
        }),
      });

      if (response.ok) {
        const savedWallet = await response.json();
        console.log("Wallet Created:", savedWallet);
        onClose();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to save wallet");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Server unreachable");
    }
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
                        style={{
                          backgroundColor: "var(--color-accent-primary)",
                        }}
                      />
                    }
                  />
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <EmptyBoxContainer
                    color={selectedColorHex}
                    onClick={() => navigateTo(2)}
                    modifier={{
                      height: "120px",
                      width: "120px",
                    }}
                  >
                    <IconRes icon={walletData.icon} size={80} />
                  </EmptyBoxContainer>
                </div>

                <EmptyBoxContainer>
                  <HorizontalColorPickerComponent
                    colors={PALETTE_LIST}
                    selectedColorId={walletData.color}
                    onSelect={(id) =>
                      setWalletData((prev) => ({ ...prev, color: id }))
                    }
                  />
                </EmptyBoxContainer>

                <VerticalListContainer>
                  <InputListItemComponent
                    text="Name"
                    value={walletData.name}
                    placeholder="Name"
                    onChange={(val) =>
                      setWalletData({ ...walletData, name: val })
                    }
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
                <VerticalListContainer>
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
