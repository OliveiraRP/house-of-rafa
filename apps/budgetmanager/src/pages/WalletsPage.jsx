import { useEffect, useState, useCallback } from "react";
import { ENV } from "../config/env";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonPageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { SpacedVerticalListContainer } from "@ui/containers/VerticalListContainer";
import { CardComponent } from "@ui/components/CardComponent";
import { TextRes } from "@ui/utils/TextRes";
import { IconRes } from "@ui/utils/IconRes";

import settingsIcon from "@ui/assets/icons/settings.svg";
import plusIcon from "@ui/assets/icons/plus.svg";

export default function HomePage() {
  const [wallets, setWallets] = useState([]);
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
    // TODO: Open add wallet modal
  }, []);

  if (loading) return <div>Loading wallets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <OneColumnTemplate
      header={
        <TwoButtonPageHeaderComponent
          leftButton={
            <IconButtonComponent
              icon={<IconRes icon={settingsIcon} alt="Settings" />}
              onClick={handleSettingsPress}
            />
          }
          rightButton={
            <IconButtonComponent
              icon={<IconRes icon={plusIcon} alt="Add" />}
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
            icon={<IconRes icon={settingsIcon} />}
          />
        ))}
      </SpacedVerticalListContainer>
    </OneColumnTemplate>
  );
}
