import { colorToFilter } from "./colorToFilter";

export function IconRes({ icon, alt = "", color = "#d4d4d4" }) {
  return (
    <img
      src={icon}
      alt={alt}
      style={{
        filter: colorToFilter(color),
      }}
    />
  );
}
