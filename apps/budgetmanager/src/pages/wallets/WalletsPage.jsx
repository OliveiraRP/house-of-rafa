import { useState, useMemo } from "react";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { CreateWalletPage } from "./CreateWalletPage";
import { WalletDetailsPage } from "./WalletDetailsPage";
import { FullScreenOverlayTemplate } from "@ui/templates/OverlayTemplate";
import { TwoButtonPageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import {
  TextButtonComponent,
  IconButtonComponent,
} from "@ui/components/ButtonComponent";
import { SpacedVerticalListContainer } from "@ui/containers/VerticalListContainer";
import { CardComponent } from "@ui/components/CardComponent";
import { TextRes } from "@ui/utils/TextRes";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { WalletsBalanceInfo } from "../../ui/WalletsBalanceInfo";
import { formatEuro } from "../../utils/currency";
import { useWallets, useArchiveWallet } from "../../hooks/useWallets";
import { WalletIcon } from "../../ui/WalletIcon";

export default function WalletsPage() {
  const { data: wallets = [] } = useWallets();
  const archiveMutation = useArchiveWallet();
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const balanceSlides = useMemo(() => {
    const eligibleWallets = wallets.filter((w) => w.includeNetWorth);
    const totalBalance = eligibleWallets
      .filter((w) => w.type !== "savings")
      .reduce((sum, w) => sum + w.balance, 0);
    const totalSavings = eligibleWallets
      .filter((w) => w.type === "savings")
      .reduce((sum, w) => sum + w.balance, 0);
    return [
      { amount: formatEuro(totalBalance), label: "Total Balance" },
      { amount: formatEuro(totalSavings), label: "Total Savings" },
      {
        amount: formatEuro(totalBalance + totalSavings),
        label: "Total Net Worth",
      },
    ];
  }, [wallets]);

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
              onClick={() => setIsCreateWalletOpen(true)}
            />
          }
          title="Wallets"
        />
      }
    >
      <WalletsBalanceInfo items={balanceSlides} />
      <SpacedVerticalListContainer>
        {wallets.map((wallet) => (
          <CardComponent
            key={wallet.id}
            isEditMode={isEditMode}
            onEditAction={() => archiveMutation.mutate(wallet.id)}
            onClick={() => setSelectedWallet(wallet)}
            title={
              <TextRes
                text={wallet.name}
                color={wallet.color}
                style={{ fontWeight: 600 }}
              />
            }
            description={
              <TextRes
                text={formatEuro(wallet.balance)}
                style={{ fontWeight: 700, fontSize: 24 }}
              />
            }
            icon={<WalletIcon color={wallet.color} icon={wallet.icon} />}
            editIcon={ICON.ARCHIVE}
          />
        ))}
      </SpacedVerticalListContainer>

      <FullScreenOverlayTemplate
        isOpen={isCreateWalletOpen}
        onClose={() => setIsCreateWalletOpen(false)}
      >
        <CreateWalletPage onClose={() => setIsCreateWalletOpen(false)} />
      </FullScreenOverlayTemplate>

      <FullScreenOverlayTemplate
        isOpen={!!selectedWallet}
        onClose={() => setSelectedWallet(null)}
      >
        <WalletDetailsPage
          wallet={selectedWallet}
          onClose={() => setSelectedWallet(null)}
        />
      </FullScreenOverlayTemplate>
    </OneColumnTemplate>
  );
}
