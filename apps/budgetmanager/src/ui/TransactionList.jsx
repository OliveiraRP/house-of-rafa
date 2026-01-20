import { useMemo } from "react";
import { IconRes } from "@ui/utils/IconRes";
import { TextRes } from "@ui/utils/TextRes";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { IconSubTextListItemComponent } from "@ui/components/ListItemComponent";
import { EmptyRoundBoxContainer } from "@ui/containers/BoxContainer";
import { formatEuro } from "../utils/currency";
import { SubTitleSectionHeaderComponent } from "@ui/components/headers/SectionHeaderComponent";

export function TransactionList({
  transactions,
  isElevated,
  onTransactionClick,
}) {
  const groupedTransactions = useMemo(() => {
    const groups = {};
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    });

    transactions.forEach((t) => {
      const dateKey = dateFormatter.format(new Date(t.date));
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(t);
    });

    return Object.entries(groups);
  }, [transactions]);

  return (
    <>
      {groupedTransactions.map(([date, items]) => (
        <VerticalListContainer
          key={date}
          header={<SubTitleSectionHeaderComponent subTitle={date} />}
          isElevated={isElevated}
        >
          {items.map((t) => {
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
                onClick={() => onTransactionClick?.(t)}
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
                value={<TextRes text={amountDisplay} color={amountColor} />}
              />
            );
          })}
        </VerticalListContainer>
      ))}
    </>
  );
}
