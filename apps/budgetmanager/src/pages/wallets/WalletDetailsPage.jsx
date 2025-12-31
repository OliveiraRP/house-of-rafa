import { useState, useMemo } from "react";
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
  IconListItemComponent,
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
import { useTransactions } from "../../hooks/useTransactions";
import { useUpdateWallet } from "../../hooks/useWallets";
import { WalletTransactionsPage } from "./WalletTransactionsPage";

export function WalletDetailsPage({ wallet, onClose }) {
  const { view, direction, navigateTo } = useViewNavigation(0);
  const { data: allTransactions = [] } = useTransactions(wallet?.id);
  const updateMutation = useUpdateWallet();

  const transactions = useMemo(
    () => allTransactions.slice(0, 5),
    [allTransactions]
  );

  const [walletData, setWalletData] = useState(() => ({
    name: wallet?.name || "",
    icon: wallet?.icon || "",
    color: wallet ? getColorIdFromHex(wallet.color) : "indigo",
    includeNetWorth: wallet?.includeNetWorth ?? true,
    goal: wallet?.goal ?? null,
    annualBudget: wallet?.annualBudget ?? null,
  }));

  if (!wallet) return null;

  const handleSubmit = () => {
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

    updateMutation.mutate({ id: wallet.id, payload }, { onSuccess: onClose });
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
                    isElevated={true}
                  >
                    {transactions.map((t) => {
                      let subText =
                        t.type === "transfer"
                          ? `${t.fromWalletName} → ${t.toWalletName}`
                          : t.description;
                      let amountColor = "var(--color-text-primary)";
                      let amountDisplay = formatEuro(t.amount);

                      if (t.type === "income") {
                        amountDisplay = `+${amountDisplay}`;
                        amountColor = "var(--color-income)";
                      } else if (t.type === "transfer") {
                        amountDisplay = `(${amountDisplay})`;
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
                          onClick={() => navigateTo(0)}
                        />
                      );
                    })}
                    <IconListItemComponent
                      text={"See all transactions"}
                      icon={<IconRes icon={ICON.NEXT} size={20} />}
                      onClick={() => navigateTo(2)}
                    />
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
                <VerticalListContainer isElevated={true}>
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
                      text="Annual budget"
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
          case 2:
            return (
              <WalletTransactionsPage
                wallet={wallet}
                onClose={() => navigateTo(0)}
              />
            );
          default:
            return null;
        }
      })()}
    </ViewSwitcher>
  );
}
