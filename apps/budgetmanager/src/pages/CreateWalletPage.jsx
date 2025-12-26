import { useState } from "react";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";

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
              icon={<IconRes icon={ICON.BACK} alt="Settings" />}
              onClick={onClose}
            />
          }
          title="Create wallet"
        />
      }
    ></OneColumnTemplate>
  );
}
