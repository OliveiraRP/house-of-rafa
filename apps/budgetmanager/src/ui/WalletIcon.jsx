import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { IconRes } from "@ui/utils/IconRes";

export function WalletIcon({ color, onIconClick, icon }) {
  return (
    <EmptyBoxContainer
      color={color}
      onClick={onIconClick}
      modifier={{
        height: "64px",
        width: "64px",
        padding: "10px",
        borderRadius: "16px",
      }}
    >
      <IconRes icon={icon} size={48} />
    </EmptyBoxContainer>
  );
}
