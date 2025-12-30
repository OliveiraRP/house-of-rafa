import { useEffect, useState, useCallback, useMemo } from "react";
import { ENV } from "../../config/env";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { CreateWalletPage } from "./CreateWalletPage";
import { WalletDetailsPage } from "./WalletDetailsPage";
import { FullScreenOverlayTemplate } from "@ui/templates/OverlayTemplate";
import { TwoButtonPageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { TextButtonComponent } from "@ui/components/ButtonComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { SpacedVerticalListContainer } from "@ui/containers/VerticalListContainer";
import { CardComponent } from "@ui/components/CardComponent";
import { TextRes } from "@ui/utils/TextRes";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { WalletsBalanceInfo } from "../../ui/WalletsBalanceInfo";
import { formatEuro } from "../../utils/currency";

export default function WalletsPage() {
  const [wallets, setWallets] = useState([]);
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWallets = useCallback(async () => {
    try {
      const res = await fetch(`${ENV.BACKEND_URL}/api/v1/wallets`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch wallets");

      const data = await res.json();
      setWallets(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const balanceSlides = useMemo(() => {
    const eligibleWallets = wallets.filter((w) => w.includeNetWorth === true);
    const totalBalance = eligibleWallets
      .filter((w) => w.type !== "savings")
      .reduce((sum, w) => sum + w.balance, 0);
    const totalSavings = eligibleWallets
      .filter((w) => w.type === "savings")
      .reduce((sum, w) => sum + w.balance, 0);

    const netWorth = totalBalance + totalSavings;

    return [
      { amount: formatEuro(totalBalance), label: "Total Balance" },
      {
        amount: formatEuro(totalSavings),
        label: "Total Savings",
      },
      {
        amount: formatEuro(netWorth),
        label: "Total Net Worth",
      },
    ];
  }, [wallets]);

  const handleEditPress = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const handleAddWalletPress = useCallback(() => {
    setIsCreateWalletOpen(true);
  }, []);

  const handleWalletPress = useCallback((wallet) => {
    setSelectedWallet(wallet);
  }, []);

  const handleArchiveWallet = async (walletId) => {
    setWallets((prev) => prev.filter((w) => w.id !== walletId));

    try {
      const res = await fetch(
        `${ENV.BACKEND_URL}/api/v1/wallets/${walletId}/archive`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!res.ok) {
        await fetchWallets();
      }
    } catch (err) {
      console.error("Archive Error:", err);
      await fetchWallets();
    }
  };

  if (loading) return <div>Loading wallets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <OneColumnTemplate
      header={
        <TwoButtonPageHeaderComponent
          leftButton={
            <TextButtonComponent
              text={!isEditMode ? "Edit" : "Done"}
              onClick={handleEditPress}
            />
          }
          rightButton={
            <IconButtonComponent
              icon={<IconRes icon={ICON.ADD} alt="Add" />}
              onClick={handleAddWalletPress}
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
            onEditAction={() => handleArchiveWallet(wallet.id)}
            onClick={() => handleWalletPress(wallet)}
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
            icon={
              <EmptyBoxContainer
                color={wallet.color}
                modifier={{ height: "64px", width: "64px" }}
              >
                <IconRes icon={wallet.icon} size={48} />
              </EmptyBoxContainer>
            }
            editIcon={ICON.ARCHIVE}
          />
        ))}
      </SpacedVerticalListContainer>

      <FullScreenOverlayTemplate
        isOpen={isCreateWalletOpen}
        onClose={() => setIsCreateWalletOpen(false)}
      >
        <CreateWalletPage
          onClose={() => {
            setIsCreateWalletOpen(false);
            fetchWallets();
          }}
        />
      </FullScreenOverlayTemplate>

      <FullScreenOverlayTemplate
        isOpen={!!selectedWallet}
        onClose={() => setSelectedWallet(null)}
      >
        <WalletDetailsPage
          wallet={selectedWallet}
          onClose={() => {
            setSelectedWallet(null);
            fetchWallets();
          }}
        />
      </FullScreenOverlayTemplate>
    </OneColumnTemplate>
  );
}
