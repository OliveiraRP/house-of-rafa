import { TextButtonComponent } from "@ui/components/ButtonComponent";
import { TextRes } from "@ui/utils/TextRes";
import { formatEuro } from "../utils/currency";
import styles from "./TransactionHeader.module.css";

export function TransactionHeader({
  type,
  amount,
  onTypeChange,
  onAmountChange,
}) {
  const transactionTypes = [
    { id: "expense", label: "Expense" },
    { id: "income", label: "Income" },
    { id: "transfer", label: "Transfer" },
  ];

  return (
    <div className={styles.transactionHeader}>
      <div className={styles.typeSelector}>
        {transactionTypes.map((t) => (
          <TextButtonComponent
            key={t.id}
            text={t.label}
            onClick={() => onTypeChange(t.id)}
            style={{
              flex: 1,
              backgroundColor:
                type === t.id
                  ? "var(--color-accent-primary)"
                  : "var(--color-bg-hover)",
            }}
          />
        ))}
      </div>

      <div className={styles.amountContainer}>
        <TextRes
          text={amount ? formatEuro(amount) : "€0,00"}
          fontSize={48}
          weight={700}
        />
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            const formatted = (Number(digits) / 100).toFixed(2);
            onAmountChange(formatted);
          }}
          className={styles.amountInput}
        />
      </div>
    </div>
  );
}
