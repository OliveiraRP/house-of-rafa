import { useState, useMemo } from "react";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { FullScreenOverlayTemplate } from "@ui/templates/OverlayTemplate";
import { TwoButtonPageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import {
  TextButtonComponent,
  IconButtonComponent,
} from "@ui/components/ButtonComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { TransactionList } from "../../ui/TransactionList";
import { useTransactionsByTimeframe } from "../../hooks/useTransactions";
import { TimeframeComponent } from "@ui/components/TimeframeComponent";
import { useUserSettings } from "../../hooks/useUserSettings";
import { getEndDate, toLocalISOString } from "../../utils/date";
import { CreateTransactionPage } from "./CreateTransactionPage";

export default function OverviewPage() {
  const { data: settings } = useUserSettings();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateTransactionOpen, setIsCreateTransactionOpen] = useState(false);

  const initialDate = useMemo(() => {
    if (!settings?.bm_start_day) return null;

    const now = new Date();
    const prefDay = settings.bm_start_day;

    let d = new Date(now.getFullYear(), now.getMonth(), prefDay, 12, 0, 0);

    if (now.getDate() < prefDay) {
      d.setMonth(d.getMonth() - 1);
    }
    return toLocalISOString(d);
  }, [settings?.bm_start_day]);

  const [currentStart, setCurrentStart] = useState(null);

  if (initialDate && !currentStart) {
    setCurrentStart(initialDate);
  }

  const endDay = useMemo(() => getEndDate(currentStart), [currentStart]);

  const { data: transactions = [] } = useTransactionsByTimeframe(
    currentStart,
    endDay
  );

  return (
    <OneColumnTemplate
      header={
        <TwoButtonPageHeaderComponent
          leftButton={
            <TextButtonComponent
              text={!isEditMode ? "Edit" : "Done"}
              onClick={() => setIsEditMode(!isEditMode)}
            />
          }
          rightButton={
            <IconButtonComponent
              icon={<IconRes icon={ICON.ADD} />}
              onClick={() => setIsCreateTransactionOpen(true)}
            />
          }
          title="Overview"
        />
      }
    >
      <TimeframeComponent
        startDate={currentStart}
        onRangeChange={setCurrentStart}
      />

      <TransactionList transactions={transactions} />

      <FullScreenOverlayTemplate
        isOpen={isCreateTransactionOpen}
        onClose={() => setIsCreateTransactionOpen(false)}
      >
        <CreateTransactionPage
          onClose={() => setIsCreateTransactionOpen(false)}
        />
      </FullScreenOverlayTemplate>
    </OneColumnTemplate>
  );
}
