import * as Icons from "react-icons/tb";
import { ICON } from "../constants/icons";

/**
 * Returns an icon from react-icons library
 * Library link: https://react-icons.github.io/react-icons/icons/lu/
 */
export const getIconComponent = (iconName) => {
  if (Icons[iconName]) return Icons[iconName];
  return Icons[ICON.FALLBACK];
};
