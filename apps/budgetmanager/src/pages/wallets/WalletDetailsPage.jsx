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
import { IconRes } from "@ui/utils/IconRes";
import { TextRes } from "@ui/utils/TextRes";
import { ICON } from "@ui/constants/icons";

export function WalletDetailsPage({ wallet, onClose }) {
  const [transactions, setTransactions] = useState([]);
  const { view, direction, navigateTo } = useViewNavigation(0);

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
                    title={wallet.name}
                    subtitle="Wallet Details"
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
                        amountDisplay = `+€${t.amount}`;
                        amountColor = "var(--color-income)";
                      } else if (t.type === "expense") {
                        amountDisplay = `€${Math.abs(t.amount)}`;
                        amountColor = "var(--color-text-primary)";
                      } else if (t.type === "transfer") {
                        amountDisplay = `(€${Math.abs(t.amount)})`;
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
              </OneColumnTemplate>
            );
          default:
            return null;
        }
      })()}
    </ViewSwitcher>
  );
}
