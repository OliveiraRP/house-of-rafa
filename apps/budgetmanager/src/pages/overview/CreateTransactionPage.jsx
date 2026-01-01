import { useState, useMemo } from "react";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import {
  EmptyListItemComponent,
  InputListItemComponent,
  SwitchListItemComponent,
  IconSubTextListItemComponent,
} from "@ui/components/ListItemComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { useCreateTransaction } from "../../hooks/useTransactions";
import { useWallets } from "../../hooks/useWallets";
import { useCategories } from "../../hooks/useCategories";
import { useUserSettings } from "../../hooks/useUserSettings";
import { TransactionHeader } from "../../ui/TransactionHeader";
import { CategoryIcon } from "../../ui/CategoryIcon";

export function CreateTransactionPage({ onClose }) {
  const { view, direction, navigateTo } = useViewNavigation(0);
  const createMutation = useCreateTransaction();

  const { data: wallets = [] } = useWallets();
  const { data: categories = [] } = useCategories();
  const { data: settings } = useUserSettings();

  const [transactionData, setTransactionData] = useState({
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
  });

  const selectedWalletId = useMemo(() => {
    if (transactionData.walletId) return transactionData.walletId;
    const settingId =
      transactionData.type === "income"
        ? settings?.bm_default_income_wallet_id
        : settings?.bm_default_expense_wallet_id;
    return settingId || wallets[0]?.id;
  }, [transactionData.walletId, transactionData.type, settings, wallets]);

  const selectedFromId = useMemo(() => {
    return (
      transactionData.fromWalletId ||
      settings?.bm_default_transfer_from_wallet_id ||
      wallets[0]?.id
    );
  }, [transactionData.fromWalletId, settings, wallets]);

  const selectedToId = useMemo(() => {
    return (
      transactionData.toWalletId ||
      settings?.bm_default_transfer_to_wallet_id ||
      wallets[1]?.id ||
      wallets[0]?.id
    );
  }, [transactionData.toWalletId, settings, wallets]);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => c.group_type === transactionData.type);
  }, [categories, transactionData.type]);

  const selectedCategoryId = useMemo(() => {
    if (transactionData.categoryId) return transactionData.categoryId;
    const settingId =
      transactionData.type === "income"
        ? settings?.bm_default_income_category_id
        : transactionData.type === "expense"
        ? settings?.bm_default_expense_category_id
        : settings?.bm_default_transfer_category_id;
    return settingId || filteredCategories[0]?.id;
  }, [
    transactionData.categoryId,
    transactionData.type,
    settings,
    filteredCategories,
  ]);

  const getWallet = (id) => wallets.find((w) => w.id === id);
  const getCategory = (id) => categories.find((c) => c.id === id);

  const handleSubmit = () => {
    if (!transactionData.amount || Number(transactionData.amount) <= 0) return;

    const payload = {
      ...transactionData,
      amount: Number(transactionData.amount),
      walletId: transactionData.type !== "transfer" ? selectedWalletId : null,
      fromWalletId: transactionData.type === "transfer" ? selectedFromId : null,
      toWalletId: transactionData.type === "transfer" ? selectedToId : null,
      categoryId:
        transactionData.type !== "transfer" ? selectedCategoryId : null,
    };

    createMutation.mutate(payload, {
      onSuccess: onClose,
      onError: (err) => alert(err.message),
    });
  };

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
                    title="New transaction"
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

                <VerticalListContainer isElevated={true} title="Details">
                  {transactionData.type !== "transfer" ? (
                    <IconSubTextListItemComponent
                      text="Wallet"
                      value={
                        getWallet(selectedWalletId)?.name || "Select wallet"
                      }
                      onClick={() => navigateTo(2)}
                      icon={
                        <CategoryIcon
                          color={getWallet(selectedWalletId)?.color}
                          icon={getWallet(selectedWalletId)?.icon}
                        />
                      }
                    />
                  ) : (
                    <>
                      <IconSubTextListItemComponent
                        text="From"
                        value={
                          getWallet(selectedFromId)?.name || "Select wallet"
                        }
                        onClick={() => navigateTo(3)}
                        icon={
                          <CategoryIcon
                            color={getWallet(selectedFromId)?.color}
                            icon={getWallet(selectedFromId)?.icon}
                          />
                        }
                      />
                      <IconSubTextListItemComponent
                        text="To"
                        value={getWallet(selectedToId)?.name || "Select wallet"}
                        onClick={() => navigateTo(4)}
                        icon={
                          <CategoryIcon
                            color={getWallet(selectedToId)?.color}
                            icon={getWallet(selectedToId)?.icon}
                          />
                        }
                      />
                    </>
                  )}

                  <IconSubTextListItemComponent
                    text="Category"
                    value={
                      getCategory(selectedCategoryId)?.name || "Select category"
                    }
                    onClick={() => navigateTo(5)}
                    icon={
                      <CategoryIcon
                        color={getCategory(selectedCategoryId)?.color}
                        icon={
                          getCategory(selectedCategoryId)?.icon || ICON.CATEGORY
                        }
                      />
                    }
                  />
                </VerticalListContainer>

                <VerticalListContainer isElevated={true}>
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
              <SelectionView
                title="Select category"
                items={filteredCategories}
                onSelect={(c) =>
                  setTransactionData((prev) => ({ ...prev, categoryId: c.id }))
                }
                onBack={() => navigateTo(0)}
              />
            );

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
