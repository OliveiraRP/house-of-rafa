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
  return (
    <div className={styles.transactionHeader}>
      <TypeSelector activeType={type} onTypeChange={onTypeChange} />
      <AmountInput amount={amount} onAmountChange={onAmountChange} />
    </div>
  );
}

export function TypeSelector({ activeType, onTypeChange }) {
  const transactionTypes = [
    { id: "expense", label: "Expense" },
    { id: "income", label: "Income" },
    { id: "transfer", label: "Transfer" },
  ];

  return (
    <div className={styles.typeSelector}>
      {transactionTypes.map((t) => (
        <TextButtonComponent
          key={t.id}
          text={t.label}
          onClick={() => onTypeChange(t.id)}
          style={{
            flex: 1,
            backgroundColor:
              activeType === t.id
                ? "var(--color-accent-primary)"
                : "var(--color-bg-hover)",
          }}
        />
      ))}
    </div>
  );
}

export function AmountInput({ amount, onAmountChange }) {
  const handleInputChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const formatted = (Number(digits) / 100).toFixed(2);
    onAmountChange(formatted);
  };

  return (
    <div className={styles.amountContainer}>
      <TextRes
        text={amount && amount !== "0.00" ? formatEuro(amount) : "€0,00"}
        fontSize={48}
        weight={700}
      />
      <input
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={handleInputChange}
        className={styles.amountInput}
        autoFocus
      />
    </div>
  );
}
