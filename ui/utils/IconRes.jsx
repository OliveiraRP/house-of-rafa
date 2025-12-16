import { colorToFilter } from "./colorToFilter";

export function IconRes({ icon, alt = "", color = "#d4d4d4", className }) {
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
