import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonPageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { IconRes } from "@ui/utils/IconRes";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { ICON } from "@ui/constants/icons";
import { TransactionList } from "../../ui/TransactionList";
import { useTransactions } from "../../hooks/useTransactions";

export function WalletTransactionsPage({ wallet, onClose }) {
  const { data: transactions = [] } = useTransactions(wallet?.id);

  return (
    <OneColumnTemplate
      header={
        <TwoButtonPageHeaderComponent
          leftButton={
            <IconButtonComponent
              icon={<IconRes icon={ICON.BACK} />}
              onClick={onClose}
            />
          }
          title={wallet.name}
        />
      }
    >
      <TransactionList transactions={transactions} isElevated={true} />
    </OneColumnTemplate>
  );
}
