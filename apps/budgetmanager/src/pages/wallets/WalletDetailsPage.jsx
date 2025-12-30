import { useEffect, useState } from "react";
import { ENV } from "../../config/env";
import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { IconSubTextListItemComponent } from "@ui/components/ListItemComponent";
import { EmptyRoundBoxContainer } from "@ui/containers/BoxContainer";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { SectionHeaderComponent } from "@ui/components/headers/SectionHeaderComponent";
import { GridContainer } from "@ui/containers/GridContainer";
import {
  SwitchListItemComponent,
  InputListItemComponent,
} from "@ui/components/ListItemComponent";
import { IconRes } from "@ui/utils/IconRes";
import { TextRes } from "@ui/utils/TextRes";
import { ICON } from "@ui/constants/icons";
import { WalletDetailsCard } from "../../ui/WalletDetailsCard";
import { getColorIdFromHex, PALETTE_LIST } from "../../constants/colors";
import { WALLET_ICONS } from "../../constants/icons";
import { formatEuro } from "../../utils/currency";

export function WalletDetailsPage({ wallet, onClose }) {
  const [transactions, setTransactions] = useState([]);
  const { view, direction, navigateTo } = useViewNavigation(0);

  const [walletData, setWalletData] = useState(() => ({
    name: wallet?.name || "",
    icon: wallet?.icon || "",
    color: wallet ? getColorIdFromHex(wallet.color) : "indigo",
    includeNetWorth: wallet?.includeNetWorth ?? true,
    goal: wallet?.goal ?? null,
    annualBudget: wallet?.annualBudget ?? null,
  }));

  useEffect(() => {
    async function getTransactions() {
      if (!wallet?.id) return;
      try {
        const res = await fetch(
          `${ENV.BACKEND_URL}/api/v1/transactions/wallet/${wallet.id}`,
          { credentials: "include" }
        );
        if (res.ok) {
          const data = await res.json();
          setTransactions(data.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    }

    getTransactions();
  }, [wallet?.id]);

  if (!wallet) return null;

  const handleSubmit = async () => {
    const selectedHex = PALETTE_LIST.find(
      (c) => c.id === walletData.color
    )?.hex;

    const payload = {
      name: walletData.name,
      icon: walletData.icon,
      color: selectedHex,
      includeNetWorth: walletData.includeNetWorth,
      goal: walletData.goal,
      annualBudget: walletData.annualBudget,
    };

    try {
      const res = await fetch(
        `${ENV.BACKEND_URL}/api/v1/wallets/${wallet.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (res.ok) {
        onClose();
      } else {
        const errorData = await res.json();
        console.error("Update failed:", errorData.error);
      }
    } catch (err) {
      console.error("Network error during wallet update:", err);
    }
  };

  return (
    <ViewSwitcher view={view} direction={direction}>
      {(() => {
        switch (view) {
          case 0:
            const selectedColorHex = PALETTE_LIST.find(
              (c) => c.id === walletData.color
            )?.hex;
            const hasChanges =
              walletData.name !== wallet.name ||
              walletData.icon !== wallet.icon ||
              walletData.includeNetWorth != wallet.includeNetWorth ||
              walletData.goal != wallet.goal ||
              walletData.annualBudget != wallet.annualBudget ||
              PALETTE_LIST.find((c) => c.id === walletData.color)?.hex !==
                wallet.color;

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
                    title={wallet.name}
                    rightButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.CHECK} />}
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: hasChanges
                            ? "var(--color-accent-primary)"
                            : "var(--color-bg-tertiary)",
                        }}
                      />
                    }
                  />
                }
              >
                {transactions.length > 0 && (
                  <VerticalListContainer
                    header={
                      <SectionHeaderComponent title="Latest transactions" />
                    }
                  >
                    {transactions.map((t) => {
                      let subText = t.description;
                      if (t.type === "transfer") {
                        subText = `${t.fromWalletName} → ${t.toWalletName}`;
                      }
                      let amountDisplay = "";
                      let amountColor = "var(--color-text-primary)";
                      if (t.type === "income") {
                        amountDisplay = `+${formatEuro(t.amount)}`;
                        amountColor = "var(--color-income)";
                      } else if (t.type === "expense") {
                        amountDisplay = formatEuro(t.amount);
                        amountColor = "var(--color-text-primary)";
                      } else if (t.type === "transfer") {
                        amountDisplay = `(${formatEuro(t.amount)})`;
                        amountColor = "var(--color-text-secondary)";
                      }

                      return (
                        <IconSubTextListItemComponent
                          key={t.id}
                          icon={
                            <EmptyRoundBoxContainer
                              color={t.categoryGroupColor}
                              modifier={{
                                height: "36px",
                                width: "36px",
                                padding: "6px",
                              }}
                            >
                              <IconRes icon={t.categoryIcon} size={24} />
                            </EmptyRoundBoxContainer>
                          }
                          text={t.categoryName}
                          subtext={subText}
                          value={
                            <TextRes text={amountDisplay} color={amountColor} />
                          }
                        />
                      );
                    })}
                  </VerticalListContainer>
                )}
                <WalletDetailsCard
                  name={walletData.name}
                  icon={walletData.icon}
                  colors={PALETTE_LIST}
                  selectedColorId={walletData.color}
                  selectedColorHex={selectedColorHex}
                  onSelect={(id) =>
                    setWalletData((prev) => ({ ...prev, color: id }))
                  }
                  onIconClick={() => navigateTo(1)}
                  onNameChange={(newName) =>
                    setWalletData((prev) => ({ ...prev, name: newName }))
                  }
                />
                <VerticalListContainer>
                  {wallet.goal !== null && (
                    <InputListItemComponent
                      text="Goal amount"
                      value={walletData.goal ? formatEuro(walletData.goal) : ""}
                      placeholder="€0.00"
                      inputMode="decimal"
                      onChange={(val) => {
                        const digits = val.replace(/\D/g, "");
                        const numberValue = (Number(digits) / 100).toFixed(2);
                        setWalletData((prev) => ({
                          ...prev,
                          goal: numberValue,
                        }));
                      }}
                    />
                  )}
                  {wallet.annualBudget !== null && (
                    <InputListItemComponent
                      text="Annual budget amount"
                      value={
                        walletData.annualBudget
                          ? formatEuro(walletData.annualBudget)
                          : ""
                      }
                      placeholder="€0.00"
                      inputMode="decimal"
                      onChange={(val) => {
                        const digits = val.replace(/\D/g, "");
                        const numberValue = (Number(digits) / 100).toFixed(2);
                        setWalletData((prev) => ({
                          ...prev,
                          annualBudget: numberValue,
                        }));
                      }}
                    />
                  )}
                  <SwitchListItemComponent
                    text="Include in net worth"
                    state={walletData.includeNetWorth}
                    onToggle={() =>
                      setWalletData((prev) => ({
                        ...prev,
                        includeNetWorth: !prev.includeNetWorth,
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
