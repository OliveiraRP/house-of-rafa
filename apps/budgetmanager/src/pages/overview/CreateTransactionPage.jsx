import { useState, useMemo } from "react";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import {
  InputListItemComponent,
  SwitchListItemComponent,
  IconSubTextListItemComponent,
  DateListItemComponent,
  EmptyListItemComponent,
} from "@ui/components/ListItemComponent";
import { IconRes } from "@ui/utils/IconRes";
import { TextRes } from "@ui/utils/TextRes";
import { ICON } from "@ui/constants/icons";
import {
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "../../hooks/useTransactions";
import { TransactionHeader } from "../../ui/TransactionHeader";
import { CategoryIcon } from "../../ui/CategoryIcon";
import { CategorySelectionPage } from "./CategorySelectionPage";
import { useSettingsContext } from "../../contexts/SettingsContext";
import { CreateCategoryPage } from "./CreateCategoryPage";

export function CreateTransactionPage({ onClose, initialData }) {
  const { view, direction, navigateTo } = useViewNavigation(0);
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();
  const { wallets, categories, resolveData } = useSettingsContext();

  const [transactionData, setTransactionData] = useState(() => {
    if (initialData && initialData.id) {
      return {
        id: initialData.id,
        type: initialData.type || "expense",
        amount: Math.abs(initialData.amount).toString(),
        date: new Date(initialData.date).toISOString().split("T")[0],
        description: initialData.description || "",
        walletId: initialData.walletId,
        fromWalletId: initialData.fromWalletId,
        toWalletId: initialData.toWalletId,
        categoryId: initialData.categoryId,
        recurrence: initialData.recurrence || "none",
        excludeFromWallet: initialData.excludeFromWallet || false,
      };
    }

    return {
      type: "expense",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      walletId: null,
      fromWalletId: null,
      toWalletId: null,
      categoryId: null,
      recurrence: "none",
      excludeFromWallet: false,
    };
  });

  const isEditing = Boolean(initialData?.id);
  const resolvedData = resolveData(transactionData);

  const filteredCategories = useMemo(
    () => categories.filter((c) => c.group_type === transactionData.type),
    [categories, transactionData.type]
  );

  const handleSubmit = () => {
    if (!transactionData.amount || Number(transactionData.amount) <= 0) return;

    const payload = {
      ...transactionData,
      amount: Number(transactionData.amount),
      walletId:
        transactionData.type !== "transfer" ? resolvedData.wallet?.id : null,
      fromWalletId:
        transactionData.type === "transfer" ? resolvedData.from?.id : null,
      toWalletId:
        transactionData.type === "transfer" ? resolvedData.to?.id : null,
      categoryId: resolvedData.category?.id || null,
    };

    const mutation = isEditing ? updateMutation : createMutation;

    mutation.mutate(payload, {
      onSuccess: onClose,
      onError: (err) => alert(err.message),
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(transactionData.id, {
      onSuccess: onClose,
      onError: (err) => alert(err.message),
    });
  };

  if (!resolvedData.wallet && transactionData.type !== "transfer") return null;

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
                    title={isEditing ? "Edit transaction" : "New transaction"}
                    rightButton={
                      <IconButtonComponent
                        icon={
                          <IconRes icon={isEditing ? ICON.CHECK : ICON.ADD} />
                        }
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: "var(--color-accent-primary)",
                        }}
                      />
                    }
                  />
                }
              >
                <TransactionHeader
                  type={transactionData.type}
                  amount={transactionData.amount}
                  onTypeChange={(newType) =>
                    setTransactionData((prev) => ({
                      ...prev,
                      type: newType,
                      walletId: null,
                      categoryId: null,
                      fromWalletId: null,
                      toWalletId: null,
                    }))
                  }
                  onAmountChange={(newAmount) =>
                    setTransactionData((prev) => ({
                      ...prev,
                      amount: newAmount,
                    }))
                  }
                />

                <VerticalListContainer isElevated={true}>
                  {transactionData.type !== "transfer" ? (
                    <IconSubTextListItemComponent
                      text="Wallet"
                      value={resolvedData.wallet?.name || "Select wallet"}
                      onClick={() => navigateTo(2)}
                      icon={
                        <CategoryIcon
                          color={resolvedData.wallet?.color}
                          icon={resolvedData.wallet?.icon}
                        />
                      }
                    />
                  ) : (
                    <>
                      <IconSubTextListItemComponent
                        text="From"
                        value={resolvedData.from?.name || "Select wallet"}
                        onClick={() => navigateTo(3)}
                        icon={
                          <CategoryIcon
                            color={resolvedData.from?.color}
                            icon={resolvedData.from?.icon}
                          />
                        }
                      />
                      <IconSubTextListItemComponent
                        text="To"
                        value={resolvedData.to?.name || "Select wallet"}
                        onClick={() => navigateTo(4)}
                        icon={
                          <CategoryIcon
                            color={resolvedData.to?.color}
                            icon={resolvedData.to?.icon}
                          />
                        }
                      />
                    </>
                  )}

                  <IconSubTextListItemComponent
                    text="Category"
                    value={resolvedData.category?.name || "Select category"}
                    onClick={() => navigateTo(5)}
                    icon={
                      <CategoryIcon
                        color={resolvedData.category?.color}
                        icon={resolvedData.category?.icon}
                      />
                    }
                  />
                </VerticalListContainer>

                <VerticalListContainer isElevated={true}>
                  <DateListItemComponent
                    text="Date"
                    value={transactionData.date}
                    onChange={(newDate) =>
                      setTransactionData((prev) => ({
                        ...prev,
                        date: newDate,
                      }))
                    }
                  />
                  <InputListItemComponent
                    text="Description"
                    value={transactionData.description}
                    placeholder="Note"
                    onChange={(val) =>
                      setTransactionData((prev) => ({
                        ...prev,
                        description: val,
                      }))
                    }
                  />
                  <SwitchListItemComponent
                    text="Exclude from wallet"
                    state={transactionData.excludeFromWallet}
                    onToggle={() =>
                      setTransactionData((prev) => ({
                        ...prev,
                        excludeFromWallet: !prev.excludeFromWallet,
                      }))
                    }
                  />
                </VerticalListContainer>

                {isEditing && (
                  <VerticalListContainer isElevated={true}>
                    <EmptyListItemComponent
                      onClick={handleDelete}
                      text={
                        <TextRes
                          text={"Delete transaction"}
                          color={"var(--color-error)"}
                        />
                      }
                    />
                  </VerticalListContainer>
                )}
              </OneColumnTemplate>
            );

          case 2:
          case 3:
          case 4:
            const targetKey =
              view === 2
                ? "walletId"
                : view === 3
                ? "fromWalletId"
                : "toWalletId";
            return (
              <SelectionView
                title="Select wallet"
                items={wallets}
                onSelect={(w) =>
                  setTransactionData((prev) => ({ ...prev, [targetKey]: w.id }))
                }
                onBack={() => navigateTo(0)}
              />
            );

          case 5:
            return (
              <CategorySelectionPage
                categories={filteredCategories}
                onSelect={(c) =>
                  setTransactionData((prev) => ({ ...prev, categoryId: c.id }))
                }
                onBack={() => navigateTo(0)}
                onCreateNew={() => navigateTo(6)}
              />
            );

          case 6:
            return <CreateCategoryPage onBack={() => navigateTo(5)} />;

          default:
            return null;
        }
      })()}
    </ViewSwitcher>
  );
}

function SelectionView({ title, items, onSelect, onBack }) {
  return (
    <OneColumnTemplate
      header={
        <TwoButtonSubtitlePageHeaderComponent
          leftButton={
            <IconButtonComponent
              icon={<IconRes icon={ICON.BACK} />}
              onClick={onBack}
            />
          }
          title={title}
        />
      }
    >
      <VerticalListContainer isElevated={true}>
        {items.map((item) => (
          <IconSubTextListItemComponent
            key={item.id}
            text={item.name}
            onClick={() => {
              onSelect(item);
              onBack();
            }}
            icon={<CategoryIcon color={item.color} icon={item.icon} />}
          />
        ))}
      </VerticalListContainer>
    </OneColumnTemplate>
  );
}
