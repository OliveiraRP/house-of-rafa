import { useState } from "react";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { IconRes } from "@ui/utils/IconRes";
import settingsIcon from "@ui/assets/icons/settings.svg";

export function CreateWalletPage({ onClose }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Logic to insert wallet in database
    onClose();
  };

  return (
    <OneColumnTemplate
      header={
        <TwoButtonSubtitlePageHeaderComponent
          leftButton={
            <IconButtonComponent
              icon={<IconRes icon={settingsIcon} alt="Settings" />}
              onClick={onClose}
            />
          }
          title="Create wallet"
        />
      }
    ></OneColumnTemplate>
  );
}
