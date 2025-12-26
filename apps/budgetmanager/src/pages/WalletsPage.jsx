import { useEffect, useState, useCallback } from "react";
import { ENV } from "../config/env";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { CreateWalletPage } from "./CreateWalletPage";
import { FullScreenOverlay } from "@ui/components/Overlay";
import { TwoButtonPageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { TextButtonComponent } from "../../../../ui/components/ButtonComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { SpacedVerticalListContainer } from "@ui/containers/VerticalListContainer";
import { CardComponent } from "@ui/components/CardComponent";
import { TextRes } from "@ui/utils/TextRes";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";

export default function WalletsPage() {
  const [wallets, setWallets] = useState([]);
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWallets() {
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
    }

    fetchWallets();
  }, []);

  const handleSettingsPress = useCallback(() => {
    // TODO: Navigate to settings or open wallet settings
  }, []);

  const handleAddWalletPress = useCallback(() => {
    setIsCreateWalletOpen(true);
  }, []);

  const handleWalletPress = useCallback(() => {
    // TODO: Open wallet modal
  }, []);

  if (loading) return <div>Loading wallets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <OneColumnTemplate
      header={
        <TwoButtonPageHeaderComponent
          leftButton={
            <TextButtonComponent text="Edit" onClick={handleSettingsPress} />
          }
          rightButton={
            <IconButtonComponent
              icon={<IconRes icon={ICON.PLUS} alt="Add" />}
              onClick={handleAddWalletPress}
            />
          }
          title="Wallets"
        />
      }
    >
      <SpacedVerticalListContainer>
        {wallets.map((wallet) => (
          <CardComponent
            key={wallet.id}
            title={
              <TextRes
                text={wallet.name}
                color="var(--color-accent-primary)"
                style={{ fontWeight: 600 }}
              />
            }
            description={
              <TextRes
                text={wallet.balance}
                style={{ fontWeight: 700, fontSize: 24 }}
              />
            }
            icon={<IconRes icon={ICON.FALLBACK} />}
            onClick={handleWalletPress}
          />
        ))}
      </SpacedVerticalListContainer>

      <FullScreenOverlay
        isOpen={isCreateWalletOpen}
        onClose={() => setIsCreateWalletOpen(false)}
      >
        <CreateWalletPage
          onClose={() => {
            setIsCreateWalletOpen(false);
            fetchWallets();
          }}
        />
      </FullScreenOverlay>
    </OneColumnTemplate>
  );
}
