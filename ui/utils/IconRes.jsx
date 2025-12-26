import { colorToFilter } from "./colorToFilter";
import { getIconComponent } from "./IconLoader";
import { ICON } from "../constants/icons";

export function IconRes({
  icon,
  alt = "",
  color = "#d4d4d4",
  size = 28,
  className,
}) {
  if (typeof icon === "string" && icon.startsWith("Tb")) {
    const IconComponent = getIconComponent(icon);
    if (!IconComponent) return null;

    const specialStyles = {
      [ICON.BACK]: { transform: "translateX(-1px)" }, // Optical nudge
    };

    const extraStyle = specialStyles[icon] || {};

    return (
      <IconComponent
        className={className}
        style={{ color: color, ...extraStyle }}
        size={size}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={icon}
      alt={alt}
      className={className}
      style={{
        filter: colorToFilter(color),
      }}
    />
  );
}
