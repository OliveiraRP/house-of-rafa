export function colorToFilter(color) {
  const filters = {
    "#ffffff": "invert(1)",
    "#d4d4d4":
      "invert(93%) sepia(0%) saturate(128%) hue-rotate(231deg) brightness(93%) contrast(91%)",
    "#4444ff":
      "invert(19%) sepia(65%) saturate(4576%) hue-rotate(240deg) brightness(106%) contrast(101%)",
  };

  return filters[color] || "none";
}
