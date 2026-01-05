import { createContext, useContext, useMemo } from "react";
import { useUserSettings } from "../hooks/useUserSettings";
import { useWallets } from "../hooks/useWallets";
import { useCategories } from "../hooks/useCategories";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const { data: settings } = useUserSettings();
  const { data: wallets = [] } = useWallets();
  const { data: categories = [] } = useCategories();

  const resolveData = useMemo(
    () => (state) => {
      if (!settings || wallets.length === 0) return {};

      const isTransfer = state.type === "transfer";

      const wallet =
        wallets.find((w) => w.id === state.walletId) ||
        wallets.find(
          (w) =>
            w.id ===
            (state.type === "income"
              ? settings.bm_default_income_wallet_id
              : settings.bm_default_expense_wallet_id)
        ) ||
        wallets[0];

      const from =
        wallets.find((w) => w.id === state.fromWalletId) ||
        wallets.find(
          (w) => w.id === settings.bm_default_transfer_from_wallet_id
        ) ||
        wallets[0];

      const to =
        wallets.find((w) => w.id === state.toWalletId) ||
        wallets.find(
          (w) => w.id === settings.bm_default_transfer_to_wallet_id
        ) ||
        wallets[1] ||
        wallets[0];

      const defaultCatId = isTransfer
        ? settings.bm_default_transfer_category_id
        : state.type === "income"
        ? settings.bm_default_income_category_id
        : settings.bm_default_expense_category_id;

      const category =
        categories.find((c) => c.id === state.categoryId) ||
        categories.find((c) => c.id === defaultCatId) ||
        categories.find((c) => c.group_type === state.type);

      return { wallet, from, to, category };
    },
    [settings, wallets, categories]
  );

  const value = { settings, wallets, categories, resolveData };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => useContext(SettingsContext);
