export const WALLET_PALETTE = {
  INDIGO: { id: "indigo", hex: "#4644D1", label: "Indigo" },
  SKY: { id: "sky", hex: "#007AFF", label: "Sky" },
  TEAL: { id: "teal", hex: "#00827C", label: "Teal" },
  TURQUOISE: { id: "turquoise", hex: "#00A3AF", label: "Turquoise" },
  ORANGE: { id: "orange", hex: "#C96400", label: "Orange" },
  YELLOW: { id: "yellow", hex: "#B08900", label: "Yellow" },
  PEACH: { id: "peach", hex: "#BF5B40", label: "Peach" },
  GOLD: { id: "gold", hex: "#9E7B15", label: "Gold" },
  CORAL: { id: "coral", hex: "#D93F36", label: "Coral" },
  ROSE: { id: "rose", hex: "#C2185B", label: "Rose" },
  PURPLE: { id: "purple", hex: "#8E24AA", label: "Purple" },
  LAVENDER: { id: "lavender", hex: "#7E57C2", label: "Lavender" },
  MINT: { id: "mint", hex: "#1B8A3E", label: "Mint" },
  SAGE: { id: "sage", hex: "#4C7A4D", label: "Sage" },
  EMERALD: { id: "emerald", hex: "#006D5B", label: "Emerald" },
  SILVER: { id: "silver", hex: "#636366", label: "Silver" },
};

export const PALETTE_LIST = Object.values(WALLET_PALETTE);

export const getColorIdFromHex = (hex) => {
  const found = Object.values(WALLET_PALETTE).find(
    (color) => color.hex.toUpperCase() === hex?.toUpperCase()
  );
  return found ? found.id : WALLET_PALETTE.INDIGO.id;
};
