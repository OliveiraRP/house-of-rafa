import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonPageHeaderContainer } from "@ui/containers/PageHeaderContainer";
import { IconButtonComponent } from "@ui/components/ButtonComponent";

import settingsIcon from "../assets/icons/settings.svg";
import plusIcon from "../assets/icons/plus.svg";

export default function HomePage() {
  return (
    <OneColumnTemplate
      header={
        <TwoButtonPageHeaderContainer
          leftButton={<IconButtonComponent icon={settingsIcon} />}
          rightButton={<IconButtonComponent icon={plusIcon} />}
          title="Wallets"
        />
      }
    ></OneColumnTemplate>
  );
}
