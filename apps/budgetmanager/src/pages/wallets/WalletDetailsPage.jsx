import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { TextListItemComponent } from "@ui/components/ListItemComponent";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";

export function WalletDetailsPage({ wallet, onClose }) {
  if (!wallet) return null;
  const { view, direction, navigateTo } = useViewNavigation(0);

  return (
    <ViewSwitcher view={view} direction={direction}>
      {(() => {
        switch (view) {
          case 0:
            return (
              <OneColumnTemplate
                header={
                  <TwoButtonSubtitlePageHeaderComponent
                    leftButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.CLOSE} />}
                        onClick={onClose}
                      />
                    }
                    title={wallet.name}
                  />
                }
              >
                <VerticalListContainer>
                  <TextListItemComponent
                    text="Type"
                    value={wallet.type}
                    onClick={() => navigateTo(1)}
                  />
                </VerticalListContainer>
              </OneColumnTemplate>
            );
          default:
            return null;
        }
      })()}
    </ViewSwitcher>
  );
}
